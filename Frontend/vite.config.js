import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         "/users": {
            target: "http://localhost:8001/api/v1",
            secure: false,
         },
      },
   },
});
