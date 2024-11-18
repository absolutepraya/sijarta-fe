-- Membuat skema SIJARTA
CREATE SCHEMA SIJARTA;

-- Menggunakan skema SIJARTA
SET search_path TO SIJARTA;

-- Tabel USER
CREATE TABLE "user" (
    Id UUID PRIMARY KEY,
    Nama VARCHAR,
    JenisKelamin CHAR(1) CHECK (JenisKelamin IN ('L', 'P')),
    NoHP VARCHAR,
    Pwd VARCHAR,
    TglLahir DATE,
    Alamat VARCHAR,
    SaldoMyPay DECIMAL
);

-- Tabel PELANGGAN
CREATE TABLE PELANGGAN (
    Id UUID PRIMARY KEY REFERENCES "user"(Id),
    Level VARCHAR
);

-- Tabel PEKERJA
CREATE TABLE PEKERJA (
    Id UUID PRIMARY KEY REFERENCES "user"(Id),
    NamaBank VARCHAR,
    NomorRekening VARCHAR,
    NPWP VARCHAR,
    LinkFoto VARCHAR,
    Rating FLOAT,
    JmlPsnananSelesai INT
);

-- Tabel KATEGORI_TR_MYPAY
CREATE TABLE KATEGORI_TR_MYPAY (
    Id UUID PRIMARY KEY,
    Nama VARCHAR
);

-- Tabel TR_MYPAY
CREATE TABLE TR_MYPAY (
    Id UUID PRIMARY KEY,
    UserId UUID REFERENCES "user"(Id),
    Tgl DATE,
    Nominal DECIMAL,
    KategoriId UUID REFERENCES KATEGORI_TR_MYPAY(Id)
);

-- Tabel KATEGORI_JASA
CREATE TABLE KATEGORI_JASA (
    Id UUID PRIMARY KEY,
    NamaKategori VARCHAR
);

-- Tabel PEKERJA_KATEGORI_JASA (Asosiatif)
CREATE TABLE PEKERJA_KATEGORI_JASA (
    PekerjaId UUID REFERENCES PEKERJA(Id),
    KategoriJasaId UUID REFERENCES KATEGORI_JASA(Id),
    PRIMARY KEY (PekerjaId, KategoriJasaId)
);

-- Tabel SUBKATEGORI_JASA
CREATE TABLE SUBKATEGORI_JASA (
    Id UUID PRIMARY KEY,
    NamaSubkategori VARCHAR,
    Deskripsi TEXT,
    KategoriJasaId UUID REFERENCES KATEGORI_JASA(Id)
);

-- Tabel SESI_LAYANAN
CREATE TABLE SESI_LAYANAN (
    SubkategoriId UUID REFERENCES SUBKATEGORI_JASA(Id),
    Sesi INT,
    Harga DECIMAL,
    PRIMARY KEY (SubkategoriId, Sesi)
);

-- Tabel DISKON
CREATE TABLE DISKON (
    Kode VARCHAR(50) PRIMARY KEY,
    Potongan DECIMAL NOT NULL CHECK (Potongan >= 0),
    MinTrPemesanan INT NOT NULL CHECK (MinTrPemesanan >= 0)
);

-- Tabel VOUCHER
CREATE TABLE VOUCHER (
    Kode VARCHAR PRIMARY KEY REFERENCES DISKON(Kode),
    JmlHariBerlaku INT NOT NULL CHECK (JmlHariBerlaku >= 0),
    KuotaPenggunaan INT,
    Harga DECIMAL NOT NULL CHECK (Harga >= 0)
);

-- Tabel PROMO
CREATE TABLE PROMO (
    Kode VARCHAR PRIMARY KEY REFERENCES DISKON(Kode),
    TglAkhirBerlaku DATE NOT NULL
);

-- Tabel METODE_BAYAR
CREATE TABLE METODE_BAYAR (
    Id UUID PRIMARY KEY,
    Nama VARCHAR NOT NULL
);


-- Tabel TR_PEMBELIAN_VOUCHER
CREATE TABLE TR_PEMBELIAN_VOUCHER (
    Id UUID PRIMARY KEY,
    TglAwal DATE NOT NULL,
    TglAkhir DATE NOT NULL,
    TelahDigunakan INT NOT NULL CHECK (TelahDigunakan >= 0),
    IdPelanggan UUID REFERENCES PELANGGAN(Id),
    IdVoucher VARCHAR REFERENCES VOUCHER(Kode),
    IdMetodeBayar UUID REFERENCES METODE_BAYAR(Id)
);

-- Tabel TR_PEMESANAN_JASA
CREATE TABLE TR_PEMESANAN_JASA (
    Id UUID PRIMARY KEY,
    TglPemesanan DATE NOT NULL,
    TglPekerjaan DATE NOT NULL,
    WaktuPekerjaan TIMESTAMP NOT NULL,
    TotalBiaya DECIMAL NOT NULL CHECK (TotalBiaya >= 0),
    IdPelanggan UUID REFERENCES PELANGGAN(Id),
    IdPekerja UUID REFERENCES PEKERJA(Id),
    IdKategoriJasa UUID,
    Sesi INT,
    IdDiskon VARCHAR(50) REFERENCES DISKON(Kode),
    IdMetodeBayar UUID REFERENCES METODE_BAYAR(Id),
    FOREIGN KEY (IdKategoriJasa, Sesi) REFERENCES SESI_LAYANAN(SubkategoriId, Sesi)
);

-- Tabel STATUS_PESANAN
CREATE TABLE STATUS_PESANAN (
    Id UUID PRIMARY KEY,
    Status VARCHAR(50) NOT NULL
);

-- Tabel TR_PEMESANAN_STATUS
CREATE TABLE TR_PEMESANAN_STATUS (
    IdTrPemesanan UUID REFERENCES TR_PEMESANAN_JASA(Id),
    IdStatus UUID REFERENCES STATUS_PESANAN(Id),
    TglWaktu TIMESTAMP NOT NULL,
    PRIMARY KEY (IdTrPemesanan, IdStatus)
);

-- Tabel TESTIMONI
CREATE TABLE TESTIMONI (
    IdTrPemesanan UUID REFERENCES TR_PEMESANAN_JASA(Id),
    Tgl DATE,
    Teks TEXT,
    Rating INT NOT NULL DEFAULT 0 CHECK (Rating >= 0),
    PRIMARY KEY (IdTrPemesanan, Tgl)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Menggunakan skema SIJARTA
SET search_path TO SIJARTA;

-- Insert data dummy untuk tabel USER (10 data)
INSERT INTO "user" (Id, Nama, JenisKelamin, NoHP, Pwd, TglLahir, Alamat, SaldoMyPay)
VALUES
    (uuid_generate_v4(), 'User 1', 'L', '081234567890', 'password1', '1990-01-01', 'Alamat 1', 100000),
    (uuid_generate_v4(), 'User 2', 'P', '081234567891', 'password2', '1992-02-02', 'Alamat 2', 200000),
    (uuid_generate_v4(), 'User 3', 'L', '081234567892', 'password3', '1994-03-03', 'Alamat 3', 300000),
    (uuid_generate_v4(), 'User 4', 'P', '081234567893', 'password4', '1996-04-04', 'Alamat 4', 400000),
    (uuid_generate_v4(), 'User 5', 'L', '081234567894', 'password5', '1998-05-05', 'Alamat 5', 500000),
    (uuid_generate_v4(), 'User 6', 'P', '081234567895', 'password6', '2000-06-06', 'Alamat 6', 600000),
    (uuid_generate_v4(), 'User 7', 'L', '081234567896', 'password7', '2002-07-07', 'Alamat 7', 700000),
    (uuid_generate_v4(), 'User 8', 'P', '081234567897', 'password8', '2004-08-08', 'Alamat 8', 800000),
    (uuid_generate_v4(), 'User 9', 'L', '081234567898', 'password9', '2006-09-09', 'Alamat 9', 900000),
    (uuid_generate_v4(), 'User 10', 'P', '081234567899', 'password10', '2008-10-10', 'Alamat 10', 1000000);

-- Insert data dummy untuk tabel PELANGGAN (5 data, subset dari USER)
INSERT INTO PELANGGAN (Id, Level)
SELECT Id, 'Gold'
FROM "user"
LIMIT 5;

-- Insert data dummy untuk tabel PEKERJA (5 data, subset dari USER)
INSERT INTO PEKERJA (Id, NamaBank, NomorRekening, NPWP, LinkFoto, Rating, JmlPsnananSelesai)
SELECT Id, 'Bank 1', '1234567890', 'NPWP001', 'http://linkfoto.com/foto1', 4.5, 50
FROM "user"
OFFSET 5
LIMIT 5;

-- Insert data dummy untuk tabel KATEGORI_JASA (5 data)
INSERT INTO KATEGORI_JASA (Id, NamaKategori)
VALUES
    (uuid_generate_v4(), 'Home Cleaning'),
    (uuid_generate_v4(), 'Deep Cleaning'),
    (uuid_generate_v4(), 'Laundry Service'),
    (uuid_generate_v4(), 'AC Service'),
    (uuid_generate_v4(), 'Garden Maintenance');

-- Insert data dummy untuk tabel PEKERJA_KATEGORI_JASA (10 data, relasi antara pekerja dan kategori jasa)
INSERT INTO PEKERJA_KATEGORI_JASA (PekerjaId, KategoriJasaId)
SELECT p.Id, k.Id
FROM PEKERJA p, KATEGORI_JASA k
ORDER BY random()
LIMIT 10;

-- Insert data dummy untuk tabel SUBKATEGORI_JASA (10 data, 2 subkategori untuk setiap kategori jasa)
INSERT INTO SUBKATEGORI_JASA (Id, NamaSubkategori, Deskripsi, KategoriJasaId)
VALUES
    (uuid_generate_v4(), 'Daily Cleaning', 'Jasa pembersihan harian', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Home Cleaning')),
    (uuid_generate_v4(), 'Spring Cleaning', 'Pembersihan besar secara menyeluruh', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Home Cleaning')),
    (uuid_generate_v4(), 'Deep Clean Kitchen', 'Pembersihan mendalam dapur', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Deep Cleaning')),
    (uuid_generate_v4(), 'Deep Clean Bathroom', 'Pembersihan mendalam kamar mandi', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Deep Cleaning')),
    (uuid_generate_v4(), 'Regular Laundry', 'Jasa cuci pakaian reguler', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Laundry Service')),
    (uuid_generate_v4(), 'Dry Cleaning', 'Layanan cuci kering', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Laundry Service')),
    (uuid_generate_v4(), 'AC Checkup', 'Pemeriksaan AC berkala', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'AC Service')),
    (uuid_generate_v4(), 'AC Deep Clean', 'Pembersihan mendalam AC', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'AC Service')),
    (uuid_generate_v4(), 'Lawn Mowing', 'Pemotongan rumput taman', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Garden Maintenance')),
    (uuid_generate_v4(), 'Garden Fertilizing', 'Pemupukan taman', (SELECT Id FROM KATEGORI_JASA WHERE NamaKategori = 'Garden Maintenance'));

-- Insert data dummy untuk tabel SESI_LAYANAN (30 data, sesi layanan untuk setiap subkategori jasa)
INSERT INTO SESI_LAYANAN (SubkategoriId, Sesi, Harga)
SELECT s.Id, generate_series(1, 3),  -- 3 sesi layanan untuk setiap subkategori
       round(CAST((random() * 500000) + 50000 AS numeric), 0)  -- Harga acak antara 50.000 hingga 550.000 dengan dua desimal
FROM SUBKATEGORI_JASA s;

-- Insert data dummy untuk tabel KATEGORI_TR_MYPAY (5 data)
INSERT INTO KATEGORI_TR_MYPAY (Id, Nama)
VALUES
    (uuid_generate_v4(), 'Topup'),
    (uuid_generate_v4(), 'Pembayaran Jasa'),
    (uuid_generate_v4(), 'Transfer'),
    (uuid_generate_v4(), 'Refund'),
    (uuid_generate_v4(), 'Pembelian Voucher');
	
-- Insert data dummy untuk tabel TR_MYPAY (25 data)
INSERT INTO TR_MYPAY (Id, UserId, Tgl, Nominal, KategoriId)
SELECT 
    uuid_generate_v4(), 
    u.Id, 
    (current_date - floor(random() * 365)::int),  -- Tanggal acak dalam satu tahun terakhir
    round(CAST((random() * 1000000) + 50000 AS numeric), 0),  -- Nominal transaksi acak antara 50.000 hingga 1.050.000
    k.Id
FROM "user" u
JOIN KATEGORI_TR_MYPAY k ON random() <= 1  -- Pilih kategori transaksi secara acak
ORDER BY random()
LIMIT 25;

-- Insert data dummy untuk tabel DISKON (20 data)
INSERT INTO DISKON (Kode, Potongan, MinTrPemesanan)
VALUES
    ('DISKON001', 50000, 100000),
    ('DISKON002', 75000, 150000),
    ('DISKON003', 100000, 200000),
    ('DISKON004', 20000, 50000),
    ('DISKON005', 150000, 300000),
    ('DISKON006', 30000, 60000),
    ('DISKON007', 40000, 80000),
    ('DISKON008', 90000, 180000),
    ('DISKON009', 120000, 250000),
    ('DISKON010', 25000, 50000),
    ('DISKON011', 5000, 10000),
    ('DISKON012', 30000, 70000),
    ('DISKON013', 35000, 90000),
    ('DISKON014', 60000, 120000),
    ('DISKON015', 10000, 30000),
    ('DISKON016', 55000, 110000),
    ('DISKON017', 250000, 400000),
    ('DISKON018', 45000, 95000),
    ('DISKON019', 80000, 170000),
    ('DISKON020', 110000, 220000);

-- Insert data dummy untuk tabel VOUCHER (10 data, subset dari DISKON)
INSERT INTO VOUCHER (Kode, JmlHariBerlaku, KuotaPenggunaan, Harga)
VALUES
    ('DISKON001', 30, 100, 5000),
    ('DISKON002', 60, 200, 10000),
    ('DISKON003', 90, 150, 15000),
    ('DISKON004', 30, 50, 2500),
    ('DISKON005', 45, 80, 12000),
    ('DISKON006', 60, 300, 3000),
    ('DISKON007', 75, 120, 8000),
    ('DISKON008', 90, 100, 9000),
    ('DISKON009', 30, 200, 5000),
    ('DISKON010', 30, 250, 7500);

-- Insert data dummy untuk tabel PROMO (10 data, subset dari DISKON)
INSERT INTO PROMO (Kode, TglAkhirBerlaku)
VALUES
    ('DISKON011', '2024-12-31'),
    ('DISKON012', '2024-11-30'),
    ('DISKON013', '2024-10-15'),
    ('DISKON014', '2024-09-01'),
    ('DISKON015', '2024-08-20'),
    ('DISKON016', '2024-07-10'),
    ('DISKON017', '2024-06-05'),
    ('DISKON018', '2024-05-25'),
    ('DISKON019', '2024-04-18'),
    ('DISKON020', '2024-03-10');
	
-- Insert data dummy untuk tabel METODE_BAYAR (6 data)
INSERT INTO METODE_BAYAR (Id, Nama)
VALUES
    (uuid_generate_v4(), 'MyPay'),
    (uuid_generate_v4(), 'GoPay'),
    (uuid_generate_v4(), 'OVO'),
    (uuid_generate_v4(), 'LinkAja'),
    (uuid_generate_v4(), 'Dana'),
    (uuid_generate_v4(), 'Transfer Bank');

-- Insert data dummy untuk tabel TR_PEMBELIAN_VOUCHER (18 data)
INSERT INTO TR_PEMBELIAN_VOUCHER (Id, TglAwal, TglAkhir, TelahDigunakan, IdPelanggan, IdVoucher, IdMetodeBayar)
SELECT
    uuid_generate_v4(), 
    (current_date - floor(random() * 30)::int),  -- TglAwal: random date between 30 days ago and today
    (current_date - floor(random() * 30)::int) + interval '1 day' * v.JmlHariBerlaku,  -- TglAkhir: TglAwal + JmlHariBerlaku from VOUCHER table
    CAST(round(random()) AS int),  -- TelahDigunakan: random 0 or 1
    p.Id, 
    v.Kode, 
    m.Id
FROM PELANGGAN p
JOIN VOUCHER v ON random() <= 1  -- Pilih voucher acak
JOIN METODE_BAYAR m ON random() <= 1  -- Pilih metode bayar acak
ORDER BY random()
LIMIT 18;

-- Insert data dummy untuk tabel TR_PEMESANAN_JASA (25 data)
INSERT INTO TR_PEMESANAN_JASA (Id, TglPemesanan, TglPekerjaan, WaktuPekerjaan, TotalBiaya, IdPelanggan, IdPekerja, IdKategoriJasa, Sesi, IdDiskon, IdMetodeBayar)
SELECT
    uuid_generate_v4(),
    (current_date - (7 + floor(random() * 7))::int),  -- TglPemesanan: random date between 14 and 7 days agoy
    (current_date - floor(random() * 700)::int),   -- TglPekerjaan: random date between 7 days ago and today
    (current_date - floor(random() * 700)::int) + interval '1 hour' * floor(random() * 24),  -- WaktuPekerjaan: random hour on the selected TglPekerjaan
    round(CAST(random() * 100000000 AS numeric), 0),  -- TotalBiaya: random amount between 0 and 1,000,000
    p.Id,
    pk.Id,
    sl.Subkategoriid,
    sl.Sesi,
    d.Kode,
    m.Id
FROM PELANGGAN p
JOIN PEKERJA pk ON random() <= 1  -- Pilih pekerja acak
JOIN SESI_LAYANAN sl ON random() <= 1  -- Pilih sesi layanan acak
LEFT JOIN DISKON d ON random() <= 1  -- Diskon acak
JOIN METODE_BAYAR m ON random() <= 1  -- Pilih metode bayar acak
ORDER BY random()
LIMIT 25;

-- Insert data dummy untuk tabel STATUS_PESANAN (7 data)
INSERT INTO STATUS_PESANAN (Id, Status)
VALUES
    (uuid_generate_v4(), 'Menunggu Pembayaran'),
    (uuid_generate_v4(), 'Pembayaran Berhasil'),
    (uuid_generate_v4(), 'Mencari Pekerja Terdekat'),
    (uuid_generate_v4(), 'Pekerja Ditemukan'),
    (uuid_generate_v4(), 'Pekerjaan Dimulai'),
    (uuid_generate_v4(), 'Pekerjaan Selesai'),
    (uuid_generate_v4(), 'Pemesanan Dibatalkan');
	
-- Insert data dummy untuk tabel TR_PEMESANAN_STATUS (35 data, riwayat perubahan status pesanan)
INSERT INTO TR_PEMESANAN_STATUS (IdTrPemesanan, IdStatus, TglWaktu)
SELECT
    t.Id,
    s.Id,
    (current_timestamp - interval '1 day' * floor(random() * 30)) -- Tanggal dan waktu acak dalam 30 hari terakhir
FROM TR_PEMESANAN_JASA t
JOIN STATUS_PESANAN s ON random() <= 1  -- Pilih status pesanan acak
ORDER BY random()
LIMIT 35;

-- Insert data dummy untuk tabel TESTIMONI (17 data)
INSERT INTO TESTIMONI (IdTrPemesanan, Tgl, Teks, Rating)
SELECT
    t.Id,
    (current_date - floor(random() * 30)::int),  -- Tanggal acak dalam 30 hari terakhir
    'Pelayanan sangat memuaskan',  -- Testimoni statis
    5  -- Rating average
FROM TR_PEMESANAN_JASA t
ORDER BY random()
LIMIT 17;