import { parseJSON, formatDistanceToNow } from 'date-fns';

export const getTimeAgo = (timestamp) => {
    const parsedTime = parseJSON(timestamp);
    const timePeriod = formatDistanceToNow(parsedTime);
    return timePeriod;
};

export const alreadyExist = (collection, itemID) => {
    return !!collection.find((item) => item._id === itemID || item === itemID);
};

export const isAlreadyLiked = (likeArray, userId) => {
    return !!likeArray.find((like) => like === userId);
};
