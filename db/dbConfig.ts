import { DataSource } from "typeorm"
import { Customer } from "./entities/Customer.js"

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "customerdb",
    entities: [Customer],
    synchronize: true,
    logging: false,
})

export default dataSource;