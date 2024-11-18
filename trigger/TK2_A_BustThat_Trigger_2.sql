-- Function for refunding MyPay balance
CREATE OR REPLACE FUNCTION process_refund_balance()
RETURNS TRIGGER AS $$
DECLARE
    customer_id UUID;
    refund_amount DECIMAL;
BEGIN
    -- Retrieve order information
    SELECT IdPelanggan, TotalBiaya
    INTO customer_id, refund_amount
    FROM TR_PEMESANAN_JASA
    WHERE Id = NEW.IdTrPemesanan;

    -- Ensure the order is in "Mencari Pekerja Terdekat" status
    IF EXISTS (
        SELECT 1
        FROM TR_PEMESANAN_STATUS order_status
        JOIN STATUS_PESANAN status ON order_status.IdStatus = status.Id
        WHERE order_status.IdTrPemesanan = NEW.IdTrPemesanan
        AND status.Status = 'Mencari Pekerja Terdekat'
    ) THEN
        -- Refund the balance to the customer
        UPDATE "USER"
        SET SaldoMyPay = SaldoMyPay + refund_amount
        WHERE Id = customer_id;
    ELSE
        RAISE EXCEPTION 'Order cannot be canceled as it is not in "Mencari Pekerja Terdekat" status.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the refund function above
CREATE TRIGGER trigger_on_cancellation
AFTER INSERT ON TR_PEMESANAN_STATUS
FOR EACH ROW
WHEN (NEW.IdStatus = (SELECT Id FROM STATUS_PESANAN WHERE Status = 'Dibatalkan'))
EXECUTE FUNCTION process_refund_balance();
