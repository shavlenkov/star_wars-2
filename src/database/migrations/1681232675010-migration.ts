import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681232675010 implements MigrationInterface {
    name = 'migration1681232675010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`episode_id\` int NOT NULL, \`opening_crawl\` longtext NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`homeworldId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`created\` varchar(255) NOT NULL, \`edited\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species\` (\`speciesId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_b5b68c8f3779bcdaa9afda0378\` (\`speciesId\`), INDEX \`IDX_30663fc8495f09199efa33ab85\` (\`filmsId\`), PRIMARY KEY (\`speciesId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships\` (\`starshipsId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_98904c9cab6a9c3c11aeacf768\` (\`starshipsId\`), INDEX \`IDX_c6ae67fefde29efc7325b74baa\` (\`filmsId\`), PRIMARY KEY (\`starshipsId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets_films\` (\`planetsId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_1b9e498a7b6714398614766c24\` (\`planetsId\`), INDEX \`IDX_d7f4d68dc596fce125db571c77\` (\`filmsId\`), PRIMARY KEY (\`planetsId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_films\` (\`peopleId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_f9d0038e205e511024d88b4c44\` (\`peopleId\`), INDEX \`IDX_a6ae8e23d835bdbc6b9fe43823\` (\`filmsId\`), PRIMARY KEY (\`peopleId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_vehicles\` (\`peopleId\` int NOT NULL, \`vehiclesId\` int NOT NULL, INDEX \`IDX_1228470b9119a37bc0608e7ac6\` (\`peopleId\`), INDEX \`IDX_f858faa2a7663a7258052fb4e5\` (\`vehiclesId\`), PRIMARY KEY (\`peopleId\`, \`vehiclesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_species\` (\`peopleId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_56f67794e6fc76cd1c1427ed1a\` (\`peopleId\`), INDEX \`IDX_3f0fe0fa1df5ad0ef0afc4e9fb\` (\`speciesId\`), PRIMARY KEY (\`peopleId\`, \`speciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_starships\` (\`peopleId\` int NOT NULL, \`starshipsId\` int NOT NULL, INDEX \`IDX_25cb50d5fba38a9219e6b2eb79\` (\`peopleId\`), INDEX \`IDX_2ee1350798626e1c52a83f26c0\` (\`starshipsId\`), PRIMARY KEY (\`peopleId\`, \`starshipsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_images\` (\`peopleId\` int NOT NULL, \`imagesId\` int NOT NULL, INDEX \`IDX_b77fd6b6f01dc7456a9cb9f097\` (\`peopleId\`), INDEX \`IDX_055f574f1f6b06c9254b4a833c\` (\`imagesId\`), PRIMARY KEY (\`peopleId\`, \`imagesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles\` (\`vehiclesId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_4465b1c1a89520616f3c6ccad7\` (\`vehiclesId\`), INDEX \`IDX_d892418f6e02d0ebce56bd3580\` (\`filmsId\`), PRIMARY KEY (\`vehiclesId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_8f79bb098a482fa585da15ef3a6\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_b5b68c8f3779bcdaa9afda0378e\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_30663fc8495f09199efa33ab85e\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_98904c9cab6a9c3c11aeacf768b\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_c6ae67fefde29efc7325b74baa4\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`planets_films\` ADD CONSTRAINT \`FK_1b9e498a7b6714398614766c245\` FOREIGN KEY (\`planetsId\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`planets_films\` ADD CONSTRAINT \`FK_d7f4d68dc596fce125db571c771\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_films\` ADD CONSTRAINT \`FK_f9d0038e205e511024d88b4c441\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_films\` ADD CONSTRAINT \`FK_a6ae8e23d835bdbc6b9fe43823f\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_1228470b9119a37bc0608e7ac62\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_f858faa2a7663a7258052fb4e54\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_56f67794e6fc76cd1c1427ed1a6\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_3f0fe0fa1df5ad0ef0afc4e9fbf\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_25cb50d5fba38a9219e6b2eb79e\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_2ee1350798626e1c52a83f26c0f\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_images\` ADD CONSTRAINT \`FK_b77fd6b6f01dc7456a9cb9f097d\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_images\` ADD CONSTRAINT \`FK_055f574f1f6b06c9254b4a833c2\` FOREIGN KEY (\`imagesId\`) REFERENCES \`images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_4465b1c1a89520616f3c6ccad73\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_d892418f6e02d0ebce56bd35809\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_d892418f6e02d0ebce56bd35809\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_4465b1c1a89520616f3c6ccad73\``);
        await queryRunner.query(`ALTER TABLE \`people_images\` DROP FOREIGN KEY \`FK_055f574f1f6b06c9254b4a833c2\``);
        await queryRunner.query(`ALTER TABLE \`people_images\` DROP FOREIGN KEY \`FK_b77fd6b6f01dc7456a9cb9f097d\``);
        await queryRunner.query(`ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_2ee1350798626e1c52a83f26c0f\``);
        await queryRunner.query(`ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_25cb50d5fba38a9219e6b2eb79e\``);
        await queryRunner.query(`ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_3f0fe0fa1df5ad0ef0afc4e9fbf\``);
        await queryRunner.query(`ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_56f67794e6fc76cd1c1427ed1a6\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_f858faa2a7663a7258052fb4e54\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_1228470b9119a37bc0608e7ac62\``);
        await queryRunner.query(`ALTER TABLE \`people_films\` DROP FOREIGN KEY \`FK_a6ae8e23d835bdbc6b9fe43823f\``);
        await queryRunner.query(`ALTER TABLE \`people_films\` DROP FOREIGN KEY \`FK_f9d0038e205e511024d88b4c441\``);
        await queryRunner.query(`ALTER TABLE \`planets_films\` DROP FOREIGN KEY \`FK_d7f4d68dc596fce125db571c771\``);
        await queryRunner.query(`ALTER TABLE \`planets_films\` DROP FOREIGN KEY \`FK_1b9e498a7b6714398614766c245\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_c6ae67fefde29efc7325b74baa4\``);
        await queryRunner.query(`ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_98904c9cab6a9c3c11aeacf768b\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_30663fc8495f09199efa33ab85e\``);
        await queryRunner.query(`ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_b5b68c8f3779bcdaa9afda0378e\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_8f79bb098a482fa585da15ef3a6\``);
        await queryRunner.query(`DROP INDEX \`IDX_d892418f6e02d0ebce56bd3580\` ON \`films_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_4465b1c1a89520616f3c6ccad7\` ON \`films_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_055f574f1f6b06c9254b4a833c\` ON \`people_images\``);
        await queryRunner.query(`DROP INDEX \`IDX_b77fd6b6f01dc7456a9cb9f097\` ON \`people_images\``);
        await queryRunner.query(`DROP TABLE \`people_images\``);
        await queryRunner.query(`DROP INDEX \`IDX_2ee1350798626e1c52a83f26c0\` ON \`people_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_25cb50d5fba38a9219e6b2eb79\` ON \`people_starships\``);
        await queryRunner.query(`DROP TABLE \`people_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_3f0fe0fa1df5ad0ef0afc4e9fb\` ON \`people_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_56f67794e6fc76cd1c1427ed1a\` ON \`people_species\``);
        await queryRunner.query(`DROP TABLE \`people_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_f858faa2a7663a7258052fb4e5\` ON \`people_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_1228470b9119a37bc0608e7ac6\` ON \`people_vehicles\``);
        await queryRunner.query(`DROP TABLE \`people_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6ae8e23d835bdbc6b9fe43823\` ON \`people_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9d0038e205e511024d88b4c44\` ON \`people_films\``);
        await queryRunner.query(`DROP TABLE \`people_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_d7f4d68dc596fce125db571c77\` ON \`planets_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b9e498a7b6714398614766c24\` ON \`planets_films\``);
        await queryRunner.query(`DROP TABLE \`planets_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6ae67fefde29efc7325b74baa\` ON \`films_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_98904c9cab6a9c3c11aeacf768\` ON \`films_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_30663fc8495f09199efa33ab85\` ON \`films_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5b68c8f3779bcdaa9afda0378\` ON \`films_species\``);
        await queryRunner.query(`DROP TABLE \`films_species\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
