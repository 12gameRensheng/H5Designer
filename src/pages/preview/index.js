import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridLayout from 'react-grid-layout';
import { createGlobalStyle } from 'styled-components'
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { generateFlowDOM, generateFreedomDOM } from '../../components/Drag/generateDom';
import WechatPopup from '../../components/Library/WechatPopup'
import initData from '../../config/initData';


const PageDiv = styled.div.attrs(props => ({
	className: 'preview',
}))`
	width: 100%;
	margin: 0 auto;
	height: 800px;
	position: relative;
	max-width: ${initData.maxWidth}px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	background:#f8f7f7;
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	cursor: move;
	z-index: 11;
`;
const FreedomDragBox = styled.div`
`
const QRcodeBox = styled.div`
	position:fixed;
	top:100px;
	left:100px;
	z-index:-1;
	text-align:center;
`
const QRCodeName = styled.div`
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
	color: red;
`
const CanvasBox = styled.div`
	background:#fff;
	padding:10px;
`

const Preview = props => {
	const [layout, setLayout] = useState([]);
	const [bigScreen, setBigScreen] = useState(false)
	const dispatch = useDispatch();
	const { flowLayout, freedomLayout, current } = useSelector(state => {
		return state.layoutData;
	});

	const FreeBox = useRef()
	
	const query = new URLSearchParams(useLocation().search)
	
	useEffect(()=>{
		const clientWidth = document.documentElement.clientWidth;
		if(clientWidth > 640 ){
			setBigScreen(true)
		}
		const tid = query.get('tid')
		let scale = 1
		if (initData.maxWidth > clientWidth) {
			scale = clientWidth/initData.maxWidth
		} else {
			scale =  clientWidth/initData.maxWidth
		}

		document.getElementById('viewport').setAttribute('content',`width=${initData.maxWidth}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no`)

		if(tid){
			localStorage.clear()
			dispatch({
				type: 'pageData/getLayout',
				payload: {
					tid
				}
			});
		}
	},[])

	useEffect(() => {
		
		// setTimeout(()=>{
		// 	const pageHeight = FreeBox.current.style.height
		// 	console.log(pageHeight,'pageHeight')
		// 	setPageHeight(pageHeight)
		// },0)
		
		const layouts = flowLayout.map(item => item.position);
		setLayout(layouts);
	}, [flowLayout]);

	const [wechatPopupVisibility, setWechatPopupVisibility] = useState(false);

	return (
		<>
		{
			bigScreen?<QRcodeBox>
			<QRCodeName>手机扫码预览</QRCodeName>
			<CanvasBox>
				<QRCode value = {window.location.href}></QRCode>
			</CanvasBox>
		</QRcodeBox>:''
		}
		
		<PageDiv>
			<GridLayout
				layout={layout}
				isDraggable={false}
				isResizable={false}
				CSSTransforms={true}
				cols={12}
				rowHeight={1}
				width={initData.maxWidth}
				compactType={'vertical'}
				containerPadding={[0, 0]} //整个容器边距
				margin={[0, 0]} //每个子项目边距
				innerRef={FreeBox}
			>
				{generateFlowDOM({flowLayout, type: 'preview', showPopup:()=>{setWechatPopupVisibility(true)} })}
			</GridLayout>
      <FreedomDragBox>
				{freedomLayout.map((item, index) => (
					<DragDiv
						className={item.position.i == current.id ? 'active drag' : 'drag'}
						style={{
							position: item.config.fixed == 'bottom' ? 'fixed' : 'absolute',
							left: item.position.x,
							top: item.config.fixed == 'bottom' ? 'initial' : item.position.y,
							width: item.config.fixed == 'bottom' ?'100%':item.position.w,
							height: item.position.h,
							bottom: item.config.fixed == 'bottom' ? item.config.bottomY + 'px' : 'initial',
							color: item.config.color,
							fontSize: item.config.fontSize + 'px',
							backgroundColor: item.config.backgroundColor,
							textAlign: item.config.align,
						}}
						data-id={item.position.i}
						key={item.position.i}
					>
						{generateFreedomDOM({ config: item.config, type: 'preview', showPopup:()=>{setWechatPopupVisibility(true)} })}
					</DragDiv>
				))}
			</FreedomDragBox>
			
		</PageDiv>
		{
			wechatPopupVisibility?<WechatPopup onClose={()=>{setWechatPopupVisibility(false)}}></WechatPopup>:''
		}
		</>
	);
};

export default Preview;


