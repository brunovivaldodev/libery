import { app } from "./base/infra";

const PORT = 3333;

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
