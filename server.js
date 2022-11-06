const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer(){
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Kết nối thành công tới csdl " + config.db.uri);
        
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        })
    } catch (error) {
        console.log("Không thể kết nối tới csdl", error);
        process.exit()
    }
}

startServer();



