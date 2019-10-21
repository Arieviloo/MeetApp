import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import settings from '~/styles/variables';

export default styled(LinearGradient).attrs({
	colors: [settings.linearGradientPrimary, settings.linearGradiendSecondary],
})`
	flex: 1;
`;
