import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export default function Rating() {
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState('');   
  const handleRating = (star) => {
    setRating(star);
  };
  const handleComment = (text) => {
    setComment(text);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Đánh giá và bình luận tài xế</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <FontAwesome name={star <= rating ? 'star' : 'star-o'} size={30} color="orange" style={{ marginRight: 5 }} />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder="Nhập bình luận của bạn..."
        style={{ width: '80%', height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        multiline={true}
        value={comment}
        onChangeText={handleComment}
      />
      <TouchableOpacity onPress={() => {}} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
        <Text style={{fronsize: 14, color: 'white' }}>Gửi đánh giá và bình luận</Text>
      </TouchableOpacity>
    </View>
  );
}
