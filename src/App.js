import React, {Component} from 'react';
import './App.css';
import {Box, Grid, RoutedButton, Grommet, Button, Tab, Tabs, Text, Image} from 'grommet';
import {Parallax, ParallaxLayer} from 'react-spring/addons';
import * as contentful from 'contentful';
// import ApolloClient from "apollo-boost";

class Page extends Component  {

render() {
    const { offset, onClick, page } = this.props;
    const { sections } = page.fields;
    return (
        <>
            <ParallaxLayer offset={offset}>

                <Parallax
                    className="page-container"
                    ref="page"
                    pages={sections.length}
                    vertical
                    scrolling={true}
                >
                    {sections && sections.map((section, index) =>
                        <ParallaxLayer offset={index}>
                            <Grid
                                rows={['small', 'medium']}
                                columns={['medium', 'medium']}
                                gap="small"
                                areas={[
                                    { name: 'header', start: [0, 0], end: [1, 0] },
                                    { name: 'nav', start: [0, 1], end: [0, 1] },
                                    { name: 'main', start: [1, 1], end: [1, 1] },
                                ]}
                            >
                                {/*<Box gridArea="header" background="brand">*/}
                                {/*</Box>*/}
                                <Box gridArea="nav" background="light-5">
                                    <p>{section.fields.content}</p>
                                </Box>
                                <Box gridArea="main" background="light-2">
                                    <Tabs height='medium' flex='grow' alignSelf='center'>
                                        <Tab title='Tab 1'>
                                            <Box
                                                margin='medium'
                                                pad='small'
                                            >
                                                <Text>Content for the First Tab</Text>
                                            </Box>
                                        </Tab>
                                        <Tab title='Tab 2'>
                                            <Box
                                                margin='small'
                                                pad='small'
                                            >
                                                <Text>Content for the Second Tab</Text>

                                            </Box>
                                        </Tab>
                                    </Tabs>
                                </Box>
                            </Grid>
                            {(index + 1 === sections.length) &&
                            <Parallax.Layer offset={0.2} speed={0.1} style={{ opacity: 1 }}>
                                <Box>
                                    <p>Footer</p>
                                </Box>
                            </Parallax.Layer>
                            }
                        </ParallaxLayer>
                    )}
                </Parallax>

                <Parallax.Layer offset={offset} speed={0.2} onClick={onClick} style={{zIndex: '-100'}}>
                    <div className="slopeBegin"/>
                </Parallax.Layer>

                <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick} style={{zIndex: '-100'}}>
                    <div className={`slopeEnd pink`}/>
                </Parallax.Layer>

            </ParallaxLayer>

        </>
    )
}
}

// colors
// https://coolors.co/05668d-028090-00a896-02c39a-f0f3bd
// https://coolors.co/a8e0ff-8ee3f5-70cad1-3e517a-b08ea2

class App extends Component {
    state = {
        pages: []
    }
    client = contentful.createClient({
        space: 'ikjhfs32iv4o',
        accessToken: '16980665c21e77f6046af60b75ce597250921926c3b4f2575e3682c5f3a9e2ef',
    })
    componentDidMount() {
        this.fetchPosts();
    }
    fetchPosts = () => {
        this.client.getEntries({
            'content_type': 'page'
        })
            .then( response => {
                this.setState({ pages: response.items })
            })
            .catch(console.error);
    }

    goTo = to => e => this.refs.parallax.scrollTo(to);

    render() {
        const {pages} = this.state;

        return (
            <div className="App">
                <div style={{position: 'absolute', width: '100%', zIndex: 100}}>
                <Box
                    gridArea='nav'
                    direction="row-responsive"
                    justify="center"
                    align="center"
                    background="#3E517A"
                    gap="small"
                    style={{padding: '1em'}}
                >
                    <img style={{width: '75px', left: '1em', position: 'absolute'}}
                         src="https://ten-forward.com/static/10f-NO-DASH-cba956859cc858f55ec01d4ca432aa5e-ac1da.png"/>
                    {pages && pages.map((page, index) =>
                        <Button
                            key={`header-${page.fields.title}`}
                            label={page.fields.title}
                            onClick={this.goTo(index)}
                            // style={{borderColor: "#B08EA2"}}
                        />
                    )}
                </Box>
                </div>
                <Parallax
                    className="container"
                    ref="parallax"
                    pages={3}
                    horizontal
                    scrolling={false}
                >
                    {pages && pages.map((page, index) =>
                        <Page
                            key={`page-${index}`}
                            offset={index}
                            page={page}
                        />
                    )}
                </Parallax>
            </div>
        );
    }
}

export default App;
