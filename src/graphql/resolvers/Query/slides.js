import presentations from '../../../repositories/presentations.js';

const handler = (_parent, args, _context) => {
  console.log('getting slides for presentation id: ', args.input.presentationId);
  const slides = presentations.getSlidesByPresentationId(args.input.presentationId);
  return slides;

  // const slides = [];
  // // order by position
  //
  // slides.push({
  //   id: 1,
  //   title: 'Write the resolver',
  //   bulletPoints: [{
  //     id: 1,
  //     content: 'Slide/bulletPoints.js',
  //   },
  //   ],
  // });
  // slides.push({
  //   id: 2,
  //   title: 'What is the problem?',
  //   bulletPoints: [{
  //     id: 1,
  //     content: `Just like I'm showing the bullet points here slide-by-slide`,
  //   }, {
  //     id: 2,
  //     content: 'Our bullet points resolver goes to the database for bullet points slide-by-slide',
  //   }, {
  //     id: 3,
  //     content: 'This is called the N+1 problem',
  //   }],
  // });
  // slides.push({
  //   id: 3,
  //   title: 'What is the solution?',
  //   bulletPoints: [{
  //     id: 1,
  //     content: 'Fetch all the bullet points at once',
  //   }],
  // });
  // slides.push({
  //   id: 4,
  //   title: 'But ... how?',
  //   bulletPoints: [{
  //     id: 1,
  //     content: 'Handlers are invoked for each slide',
  //   }, {
  //     id: 2,
  //     content: 'We need to find a way to batch the bullet point queries',
  //   }],
  // });
  // slides.push({
  //   id: 5,
  //   title: '🚀 Dataloaders 🚀',
  //   bulletPoints: [{
  //     id: 1,
  //     content: 'A way to batch queries using the node event loop',
  //   }],
  // });
  //
  // return slides;
};

export {
  handler,
}
