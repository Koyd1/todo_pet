// import { ReactNode, Component, CSSProperties } from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
//
// import './index.module.scss';
//
// interface TooltipProps {
//     children: ReactNode;
//     content?: string;
//     style?: CSSProperties;
// }
//
// interface TooltipState {
//     visible: boolean;
// }
//
// class Tooltip extends Component<TooltipProps, TooltipState> {
//     static propTypes = {
//         children: PropTypes.node.isRequired,
//         content: PropTypes.string,
//     };
//
//     constructor(props: TooltipProps) {
//         super(props);
//
//         this.state = {
//             visible: false,
//         };
//     }
//
//     show = () => {
//         this.setVisibility(true);
//     }
//
//     hide = () => {
//         this.setVisibility(false);
//     }
//
//     setVisibility = (visible: boolean) => {
//         this.setState({ visible });
//     }
//
//     render() {
//         const { visible } = this.state;
//         const { children, content, style } = this.props;
//
//         const classes = classNames(
//             'tooltip',
//             'bottom', // Устанавливаем класс для позиции "bottom"
//         );
//
//         return (
//             <span className='tooltipWrapper'>
//
//         {visible && <span style={style} className={classes}>{content}</span>}
//                 {children}
//                 <span
//                     className='targetElement'
//                     onMouseEnter={this.show}
//                     onMouseLeave={this.hide}
//                 >
//
//         </span>
//       </span>
//         );
//     }
// }
//
// export default Tooltip;