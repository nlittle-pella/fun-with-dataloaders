const handler = (_parent, args, context) => {
  const presentations = context.dataSources.presentations;

  return presentations.getSlidesByPresentationId(args.input.presentationId);
};

export {
  handler,
}
