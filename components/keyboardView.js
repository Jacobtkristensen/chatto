import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';

export default function KeyboardView({ children, inChat }) {  // Destructure children from props
  let keyboardConfig = {}
  let scrollViewConfig = {}
  if (inChat) {
    keyboardConfig = {keyboardVerticalOffset: 90},
    scrollViewConfig = { contentContainerStyle: { flex: 1 }}
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      {...keyboardConfig}
      >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}  
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
