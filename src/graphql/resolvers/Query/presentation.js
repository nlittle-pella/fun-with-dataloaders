const handler = async (_, args, context) => {
  const presentations = context.dataSources.presentations;
  const { id } = args.input;

  return await presentations.getById(id);
};

export {
  handler,
};
