CREATE OR REPLACE FUNCTION validate_voucher_usage()
RETURNS trigger AS
$$
DECLARE
    kuota_penggunaan INT;
    tgl_akhir DATE;
    telah_digunakan INT;
BEGIN
    IF NEW.IdDiskon IS NOT NULL THEN
        SELECT KuotaPenggunaan
        INTO kuota_penggunaan
        FROM VOUCHER
        WHERE Kode = NEW.IdDiskon;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Voucher tidak ditemukan.';
        END IF;

        SELECT TglAkhir, TelahDigunakan
        INTO tgl_akhir, telah_digunakan
        FROM TR_PEMBELIAN_VOUCHER
        WHERE IdVoucher = NEW.IdDiskon AND IdPelanggan = NEW.IdPelanggan;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Anda belum membeli voucher ini.';
        END IF;

        IF NEW.TglPemesanan > tgl_akhir THEN
            RAISE EXCEPTION 'Voucher sudah kedaluwarsa.';
        END IF;

        IF telah_digunakan >= kuota_penggunaan THEN
            RAISE EXCEPTION 'Kuota penggunaan voucher telah terlampaui untuk pelanggan ini.';
        END IF;

        UPDATE TR_PEMBELIAN_VOUCHER
        SET TelahDigunakan = TelahDigunakan + 1
        WHERE IdVoucher = NEW.IdDiskon AND IdPelanggan = NEW.IdPelanggan;
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_voucher_usage
BEFORE INSERT OR UPDATE ON TR_PEMESANAN_JASA
FOR EACH ROW EXECUTE FUNCTION validate_voucher_usage();
