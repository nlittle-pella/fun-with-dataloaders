import Dataloader from 'dataloader';
import presentations from '../../repositories/presentations.js';

// const loader = () => {
//     return {
//         load: (slideId) => {
//             return presentations.getBulletsBySlideId(slideId);
//         },
//     }
// };
const loader = () => new Dataloader((slideIds) => presentations.getBulletsBySlideIds(slideIds));

export {loader};
const graphqlDataSources = () => ({
    bulletsForSlide: loader(),
    presentations,
});

export default graphqlDataSources;
