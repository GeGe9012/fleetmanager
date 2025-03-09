-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "model_year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "reg_date" INTEGER NOT NULL,
    "drivetrain" TEXT NOT NULL,
    "warranty" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "customer_address_1" TEXT NOT NULL,
    "customer_address_2" TEXT NOT NULL,
    "customer_address_3" TEXT NOT NULL,
    "customer_address_4" TEXT NOT NULL,
    "customer_tax_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "company_tax_number" TEXT NOT NULL,
    "contact_phone_number" TEXT NOT NULL,
    "reg_number" TEXT NOT NULL,
    "company_address_1" TEXT NOT NULL,
    "company_address_2" TEXT NOT NULL,
    "company_address_3" TEXT NOT NULL,
    "company_address_4" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "contract_dur" TIMESTAMP(3) NOT NULL,
    "company_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_license_plate_key" ON "Car"("license_plate");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
