CREATE OR REPLACE FUNCTION transfer_honor_pekerja()
RETURNS TRIGGER AS $$
DECLARE
    transaksi_nominal DECIMAL;
    pekerjaUUID UUID;
BEGIN
    IF NEW.id_status = (
        SELECT id_status 
        FROM STATUS_PESANAN 
        WHERE status = 'Pesanan selesai'
    ) THEN
        SELECT tr_pekerja.total_biaya, tr_pekerja.id_pekerja 
        INTO transaksi_nominal, pekerjaUUID
        FROM TR_PEMESANAN_JASA tr_pekerja
        WHERE tr_pekerja.id_tr_pemesanan_jasa = NEW.id_tr_pemesanan_jasa;

        UPDATE USERS
        SET saldomypay = saldomypay + transaksi_nominal
        WHERE id_user = pekerjaUUID;

        INSERT INTO TR_MYPAY (
            id_tr_mypay, 
            id_user, 
            tgl, 
            nominal, 
            id_kategori_tr_mypay
        )
        VALUES (
            gen_random_uuid(),
            pekerjaUUID,
            NOW(),
            transaksi_nominal,
            (
                SELECT id_kategori_tr_mypay 
                FROM KATEGORI_TR_MYPAY 
                WHERE nama = 'menerima honor transaksi jasa'
            )
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_status_update_transfer
AFTER INSERT OR UPDATE ON TR_PEMESANAN_STATUS
FOR EACH ROW
EXECUTE FUNCTION transfer_honor_pekerja();