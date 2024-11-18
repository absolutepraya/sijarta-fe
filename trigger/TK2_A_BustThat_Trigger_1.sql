‘ÀÚ×‡j– REPLACE FUNCTION cek_no_hp_terdaftar()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM "user" WHERE "NoHP" = NEW."NoHP") THEN
        RAISE EXCEPTION 'No HP % sudah terdaftar!', NEW."NoHP";
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cek_no_hp
BEFORE INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION cek_no_hp_terdaftar();

CREATE OR REPLACE FUNCTION cek_duplikasi_bank_rekening()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM PEKERJA 
        WHERE "NamaBank" = NEW."NamaBank" AND "NomorRekening" = NEW."NomorRekening"
    ) THEN
        RAISE EXCEPTION 'Kombinasi Nama Bank % dan Nomor Rekening % sudah terdaftar!', 
            NEW."NamaBank", NEW."NomorRekening";
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cek_duplikasi_bank_rekening
BEFORE INSERT ON PEKERJA
FOR EACH ROW
EXECUTE FUNCTION cek_duplikasi_bank_rekening();