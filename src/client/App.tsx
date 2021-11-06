import React from 'react';
import { Layout, Typography } from 'antd';

import Map from './Map';
import { COLORS } from './constants';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

const App = (props: AppProps) => {
    return (
        <div className="app">
            <Header style={{ background: COLORS.MAP_BACKGROUND, padding: 0, height: 40 }}>
                <Title level={5} style={{ background: COLORS.MAP_BACKGROUND, color: COLORS.DARK_GREY, paddingTop: 10,  textAlign: 'center' }}>
                    🐻‍❄️ PolarSight
                </Title>
            </Header>

            <Map />

            <Footer style={{ textAlign: 'center', padding: 5 }}>
                <Text keyboard style={{ color: COLORS.MAP_TEXT }}>
                    Built with 🤍 in Bucharest by the Great Auk team
                </Text>
            </Footer>
        </div>
    )
};

interface AppProps {}

export default App;
