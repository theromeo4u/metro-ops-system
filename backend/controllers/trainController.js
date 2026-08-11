export const addTrain = async (req, res) => {
    const train = await Train.create(req.body);

    const io = req.app.get("io");
    io.emit("trainAdded", train);

    res.json(train);
};