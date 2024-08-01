const handler = (slide, _args, context) => {
  const slideId = slide.id;

  console.log('bullets for slide handler:', slideId);

  // return [];
  const { bulletsForSlide } = context.dataSources;

  return bulletsForSlide.load(slideId);
};

export {
  handler,
}
