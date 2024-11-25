import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(fullStars)].map((_, index) => (
        <FontAwesome key={`full-${index}`} name="star" size={20} color="gold" />
      ))}
      {halfStar && <FontAwesome name="star-half-full" size={20} color="gold" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesome key={`empty-${index}`} name="star-o" size={20} color="gold" />
      ))}
    </View>
  );
};

export default RatingStars;
