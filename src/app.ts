import { http } from "./http";

import './websocket/admin';
import './websocket/client';

http.listen(3333, () => console.log("Server is running at port 3333..."));