/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
import React, {
    PropTypes,
} from 'react';
import {
    Platform,
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Actions from './Actions';
import _drawerImage from './menu_burger.png';
import _backButtonImage from './back_chevron.png';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    titleWrapper: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 5,
            },
        }),
        bottom: 1,
        left: 0,
        right: 0,
    },
    titleTextWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    titleText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#0A0A0A'
    },
    pagerWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pagerDotWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 13,
        width: 13,
        marginLeft: 7,
        marginRight: 7,
    },
    pagerDot: {
        height: 7,
        width: 7,
        borderRadius: 3.5,
        backgroundColor: '#FFF'
    },
    pagerDotActive: {
        height: 11,
        width: 11,
        borderRadius: 5.5,
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: '#EFEFF2',
        paddingTop: 0,
        top: 0,
        ...Platform.select({
            ios: {
                height: 64,
            },
            android: {
                height: 54,
            },
        }),
        right: 0,
        left: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#828287',
        position: 'absolute',
    },
    backButton: {
        width: 130,
        height: 37,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 22,
            },
            android: {
                top: 10,
            },
        }),
        left: 2,
        padding: 8,
        flexDirection: 'row',
    },
    rightButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 22,
            },
            android: {
                top: 10,
            },
        }),
        right: 2,
        padding: 8,
    },
    leftButton: {
        width: 100,
        height: 37,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 8,
            },
        }),
        left: 2,
        padding: 8,
    },
    barRightButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign: 'right',
        fontSize: 17,
    },
    barBackButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign: 'left',
        fontSize: 17,
        paddingLeft: 6,
    },
    barLeftButtonText: {
        color: 'rgb(0, 122, 255)',
        textAlign: 'left',
        fontSize: 17,
    },
    backButtonImage: {
        width: 13,
        height: 21,
    },
    rightButtonIconStyle: {},
    defaultImageStyle: {
        height: 24,
        resizeMode: 'contain',
    },
});

const propTypes = {
    navigationState: PropTypes.object,
    backButtonImage: Image.propTypes.source,
    wrapBy: PropTypes.any,
    component: PropTypes.any,
    backButtonTextStyle: Text.propTypes.style,
    leftButtonStyle: View.propTypes.style,
    leftButtonIconStyle: Image.propTypes.style,
    getTitle: PropTypes.func,
    titleStyle: Text.propTypes.style,
    titleOpacity: PropTypes.number,
    titleProps: PropTypes.any,
    position: PropTypes.object,
    navigationBarStyle: View.propTypes.style,
    navigationBarBottomBorderMargin: PropTypes.number,
    navigationBarColors: PropTypes.arrayOf(PropTypes.string),
    renderTitle: PropTypes.any,
};

const contextTypes = {
    drawer: PropTypes.object,
};

const defaultProps = {
    drawerImage: _drawerImage,
    backButtonImage: _backButtonImage,
    titleOpacity: 1,
};

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.renderRightButton = this.renderRightButton.bind(this);
        this.renderBackButton = this.renderBackButton.bind(this);
        this.renderLeftButton = this.renderLeftButton.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
    }

    renderBackButton() {
        const state = this.props.navigationState;
        const childState = state.children[state.index];
        const BackButton = (childState.component && childState.component.backButton) || state.backButton
            || childState.backButton;
        const textButtonStyle = [
            styles.barBackButtonText,
            this.props.backButtonTextStyle,
            state.backButtonTextStyle,
            childState.backButtonTextStyle,
        ];
        const style = [
            styles.backButton,
            this.props.leftButtonStyle,
            state.leftButtonStyle,
            childState.leftButtonStyle,
        ];

        if (state.index === 0) {
            return null;
        }

        if (BackButton) {
            return (
                <BackButton
                    testID="backNavButton"
                    textButtonStyle={textButtonStyle}
                    {...childState}
                    style={style}
                />
            );
        }
        let buttonImage = childState.backButtonImage ||
            state.backButtonImage || this.props.backButtonImage;
        let onPress = childState.onBack || childState.component.onBack;
        if (onPress) {
            onPress = onPress.bind(null, state);
        } else {
            onPress = Actions.pop;
        }

        let text = childState.backTitle ?
            <Text style={textButtonStyle}>
                {childState.backTitle}
            </Text>
            : null;

        return (
            <TouchableOpacity
                testID="backNavButton"
                style={style}
                onPress={onPress}
            >
                {buttonImage && !childState.hideBackImage &&
                <Image
                    source={buttonImage}
                    style={[
            styles.backButtonImage,
            this.props.leftButtonIconStyle,
            state.barButtonIconStyle,
            state.leftButtonIconStyle,
            childState.leftButtonIconStyle,
          ]}
                />
                }
                {text}
            </TouchableOpacity>
        );
    }

    renderRightButton(navProps) {
        const self = this;

        function tryRender(state, wrapBy) {
            if (!state) {
                return null;
            }
            const rightTitle = state.getRightTitle ? state.getRightTitle(navProps) : state.rightTitle;

            const textStyle = [styles.barRightButtonText, self.props.rightButtonTextStyle,
                state.rightButtonTextStyle];
            const style = [styles.rightButton, self.props.rightButtonStyle, state.rightButtonStyle];
            if (state.rightButton) {
                let Button = state.rightButton;
                if (wrapBy) {
                    Button = wrapBy(Button);
                }
                return (
                    <Button
                        {...self.props}
                        {...state}
                        key={'rightNavBarBtn'}
                        testID="rightNavButton"
                        style={style}
                        textButtonStyle={textStyle}
                    />
                );
            }
            if (state.onRight && (rightTitle || state.rightButtonImage)) {
                const onPress = state.onRight.bind(null, state);
                return (
                    <TouchableOpacity
                        key={'rightNavBarBtn'}
                        testID="rightNavButton"
                        style={style}
                        onPress={onPress}
                    >
                        {rightTitle &&
                        <Text style={textStyle}>
                            {rightTitle}
                        </Text>
                        }
                        {state.rightButtonImage &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Image
                                source={state.rightButtonImage}
                                style={state.rightButtonIconStyle}
                            />
                        </View>
                        }
                    </TouchableOpacity>
                );
            }
            if ((!!state.onRight ^ !!(typeof(rightTitle) !== 'undefined'
                || typeof(state.rightButtonImage) !== 'undefined'))) {
                console.warn(
                    `Both onRight and rightTitle/rightButtonImage
            must be specified for the scene: ${state.name}`
                );
            }
            return null;
        }

        return tryRender(this.props.component, this.props.wrapBy) || tryRender(this.props);
    }

    renderLeftButton(navProps) {
        const self = this;
        const drawer = this.context.drawer;

        function tryRender(state, wrapBy) {
            let onPress = state.onLeft;
            let buttonImage = state.leftButtonImage;
            let menuIcon = state.drawerIcon;
            const style = [styles.leftButton, self.props.leftButtonStyle, state.leftButtonStyle];
            const textStyle = [styles.barLeftButtonText, self.props.leftButtonTextStyle,
                state.leftButtonTextStyle];
            const leftButtonStyle = [styles.defaultImageStyle, state.leftButtonIconStyle];
            const leftTitle = state.getLeftTitle ? state.getLeftTitle(navProps) : state.leftTitle;

            if (state.leftButton) {
                let Button = state.leftButton;
                if (wrapBy) {
                    Button = wrapBy(Button);
                }
                return (
                    <Button
                        {...self.props}
                        {...state}
                        key={'leftNavBarBtn'}
                        testID="leftNavButton"
                        style={style}
                        textStyle={textStyle}
                    />
                );
            }

            if (!onPress && !!drawer && typeof drawer.toggle === 'function') {
                buttonImage = state.drawerImage;
                if (buttonImage || menuIcon) {
                    onPress = drawer.toggle;
                }
                if (!menuIcon) {
                    menuIcon = (
                        <Image
                            source={buttonImage}
                            style={leftButtonStyle}
                        />
                    );
                }
            }

            if (onPress && (leftTitle || buttonImage)) {
                onPress = onPress.bind(null, state);
                return (
                    <TouchableOpacity
                        key={'leftNavBarBtn'}
                        testID="leftNavButton"
                        style={style}
                        onPress={onPress}
                    >
                        {leftTitle &&
                        <Text style={textStyle}>
                            {leftTitle}
                        </Text>
                        }
                        {buttonImage &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            {menuIcon || <Image
                                source={buttonImage}
                                style={state.leftButtonIconStyle || styles.defaultImageStyle}
                            />
                            }
                        </View>
                        }
                    </TouchableOpacity>
                );
            }
            if ((!!state.onLeft ^ !!(leftTitle || buttonImage))) {
                console.warn(
                    `Both onLeft and leftTitle/leftButtonImage
            must be specified for the scene: ${state.name}`
                );
            }
            return null;
        }

        return tryRender(this.props.component, this.props.wrapBy) || tryRender(this.props);
    }

    renderTitle(childState, index: number) {
        let title = this.props.getTitle ? this.props.getTitle(childState) : childState.title;
        if (title === undefined && childState.component && childState.component.title) {
            title = childState.component.title;
        }
        if (typeof(title) === 'function') {
            title = title(childState);
        }
        const pagerState = this.props.getPagerState();
        const pagerVisible = this.props.sceneKey == 'Home_';
        const pagerIndex = this.props.pagerIndex;
        return (
            <View style={styles.titleWrapper} key={'title_wrapper_' + childState.key}>
                <View style={[styles.titleTextWrapper, pagerVisible ? {marginTop: 5} : null]}>
                    <Animated.Text
                        {...this.props.titleProps}
                        key={childState.key}
                        style={[
                              styles.titleText,
                              this.props.titleStyle,
                              this.props.navigationState.titleStyle,
                              childState.titleStyle,
                              {
                                opacity: this.props.position.interpolate({
                                  inputRange: [index - 1, index, index + 1],
                                  outputRange: [0, this.props.titleOpacity, 0],
                                }),
                                left: this.props.position.interpolate({
                                  inputRange: [index - 1, index + 1],
                                  outputRange: [200, -200],
                                }),
                                right: this.props.position.interpolate({
                                  inputRange: [index - 1, index + 1],
                                  outputRange: [-200, 200],
                                }),
                              },
                              pagerVisible ? {fontSize: 16} : null
                            ]}>
                        {title}
                    </Animated.Text>
                </View>
                {pagerVisible ?
                    <View style={styles.pagerWrapper}>
                        {pagerState.routes.map((route, index) => {
                            return <View style={styles.pagerDotWrapper} key={'pager_' + index}>
                                <View
                                    style={[styles.pagerDot, pagerIndex === index ? styles.pagerDotActive : null]}/>
                            </View>
                        })}
                    </View> : null}
            </View>
        );
    }

    render() {
        let state = this.props.navigationState;
        let selected = state.children[state.index];
        while (selected.hasOwnProperty('children')) {
            state = selected;
            selected = selected.children[selected.index];
        }
        const navProps = {...this.props, ...selected};

        const wrapByStyle = (component, wrapStyle) => {
            if (!component) {
                return null;
            }
            return (props) => <View style={wrapStyle}>{component(props)}</View>;
        };

        const leftButtonStyle = [styles.leftButton, {alignItems: 'flex-start'}];
        const rightButtonStyle = [styles.rightButton, {alignItems: 'flex-end'}];

        const renderLeftButton = wrapByStyle(selected.renderLeftButton, leftButtonStyle) ||
            wrapByStyle(selected.component.renderLeftButton, leftButtonStyle) ||
            this.renderLeftButton;
        const renderRightButton = wrapByStyle(selected.renderRightButton, rightButtonStyle) ||
            wrapByStyle(selected.component.renderRightButton, rightButtonStyle) ||
            this.renderRightButton;
        const renderBackButton = wrapByStyle(selected.renderBackButton, leftButtonStyle) ||
            wrapByStyle(selected.component.renderBackButton, leftButtonStyle) ||
            this.renderBackButton;
        const renderTitle = selected.renderTitle ||
            selected.component.renderTitle ||
            this.props.renderTitle;
        var propsNavigationBarStyle = this.props.navigationBarStyle;
        var stateNavigationBarStyle = state.navigationBarStyle;
        if (this.props.navigationBarBorderBottomMargin) {
            propsNavigationBarStyle.borderBottomWidth = 0;
            stateNavigationBarStyle.borderBottomWidth = 0;
        }
        return (
            <Animated.View
                style={[
          styles.header,
          propsNavigationBarStyle,
          stateNavigationBarStyle,
          selected.navigationBarStyle,
          this.props.navigationBarColors ? {backgroundColor: 'transparent'} : null
        ]}
            >
                {this.props.navigationBarBorderBottomMargin ? <View
                        style={{position: 'absolute', top: 0, left: this.props.navigationBarBorderBottomMargin, right: this.props.navigationBarBorderBottomMargin, bottom: 0, borderBottomWidth: 1, borderBottomColor: '#FFF'}}/> : null}
                <LinearGradient
                    colors={this.props.navigationBarColors ? this.props.navigationBarColors : []}
                    style={{flex: 1}}>
                    {renderTitle ? renderTitle(navProps) : state.children.map(this.renderTitle, this)}
                    {renderBackButton(navProps) || renderLeftButton(navProps)}
                    {renderRightButton(navProps)}
                </LinearGradient>
            </Animated.View>
        );
    }
}

NavBar.propTypes = propTypes;
NavBar.contextTypes = contextTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
