import express from "express";

const app = express();
const PORT = 3000;


app.get("/libros", (req, res) => {
    const { disponible } = req.query;
    if (disponible == undefined) {
        res.json(libros);
        return;
    } else if (disponible || disponible === "false") {
        res.json(libros.filter(libro => libro.disponible === (disponible === "true")));
    } else {
        res.json(libros);
    }
});

app.get("/autores", (req, res) => {
    res.json(autores);
});
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
