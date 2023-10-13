export const test = async (req, res) => {
  await res.json({
    message: "Hello World!",
  });
};
