import Dataloader from 'dataloader';
import presentations from '../../repositories/presentations.js';

const loader = () => {
    return {
        load: (slideId) => {
            return presentations.getBulletsBySlideId(slideId);
        },
    }
};

const graphqlDataSources = () => ({
    bulletsForSlide: loader(),
    presentations,
});

export default graphqlDataSources;
