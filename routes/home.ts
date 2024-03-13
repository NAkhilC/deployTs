const accessors = require("./../services/accessors");
const getHandler = async (req: any, res: any, next: any) => {
  const response = await accessors.getItems();
  if (response) {
    res.status(200).json({ data: response });
  } else {
    res.status(500).json({ data: [] });
  }
};

module.exports = { getHandler };
