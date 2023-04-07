-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'PENMEN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "FilmIndustry" AS ENUM ('KA', 'TA', 'TE', 'MA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "film_industry" "FilmIndustry" NOT NULL DEFAULT 'KA',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biography" (
    "id" SERIAL NOT NULL,
    "about_me" TEXT,
    "education" TEXT,
    "institute_name" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "skillset" TEXT,
    "working_at_location" TEXT,
    "upload_portfolio_pictures" TEXT,
    "personnel_showreel" TEXT,
    "awards" TEXT,
    "award_name" TEXT,
    "award_category" TEXT,
    "result" TEXT,
    "user_id" INTEGER NOT NULL,
    "film_industry" "FilmIndustry" NOT NULL DEFAULT 'KA',

    CONSTRAINT "Biography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "upload_your_passport_picture" TEXT,
    "what_other_names_you_are_called_in_the_industry" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "address" TEXT,
    "email_id" TEXT,
    "contact_number" INTEGER,
    "whatsapp_number" INTEGER,
    "gender" TEXT,
    "when_did_you_start_working_in_the_industry" TIMESTAMP(3),
    "who_introduced_you_to_the_film_industry" TEXT,
    "give_2references_and_contacts_from_the_film_industry" TEXT,
    "uer_id" INTEGER NOT NULL,
    "film_industry" "FilmIndustry" NOT NULL DEFAULT 'KA',

    CONSTRAINT "PersonalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaLinks" (
    "id" SERIAL NOT NULL,
    "facebook_account_url" TEXT,
    "instagram_account_url" TEXT,
    "linkedin_account_url" TEXT,
    "twitter_account_url" TEXT,
    "user_id" INTEGER NOT NULL,
    "film_industry" "FilmIndustry" NOT NULL DEFAULT 'KA',

    CONSTRAINT "MediaLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Biography" ADD CONSTRAINT "Biography_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalInformation" ADD CONSTRAINT "PersonalInformation_uer_id_fkey" FOREIGN KEY ("uer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaLinks" ADD CONSTRAINT "MediaLinks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
