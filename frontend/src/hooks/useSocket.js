import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function useSocket() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5001");
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return socket;
}