// @flow
import React from 'react';
import { View, Text, StyleSheet, Image as RNImage } from 'react-native';

const defaultProps = {};

type Props = {};

const Image = ({ ...props }: Props): React.Element<*> => <RNImage {...props} />;

Image.defaultProps = defaultProps;

const styles = StyleSheet.create({});

export default Image;
