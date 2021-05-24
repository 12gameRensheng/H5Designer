import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import store from "../../store";
import GridLayout from 'react-grid-layout';

const PageDiv = styled.div`
  width: 500px;
  margin: 0 auto;
  border: 1px solid #ddd;
  height: 800px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;
const DragDiv = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid #000;
  cursor: move;
`;
const EditorPoint = styled.div`
  position: absolute;
  background: #333;
  width: 10px;
  height: 10px;
  &.point-top {
    top: -5px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }
  &.point-right {
    right: -5px;
    top: 50%;
    margin-top: -5px;
    cursor: e-resize;
  }
  &.point-bottom {
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }
  &.point-left {
    left: -5px;
    top: 50%;
    margin-top: -5px;
    cursor: e-resize;
  }

  &.point-top-right {
    right: -5px;
    top: -5px;
    cursor: nesw-resize;
  }
  &.point-bottom-right {
    right: -5px;
    bottom: -5px;
    cursor: nwse-resize;
  }
  &.point-bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
  }
  &.point-top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
  }
`;
const Drag1 = () => {
  const dispatch = useDispatch();
  const selected = useSelector(state => {
    return state.selected
  })
  console.log(selected, 'selected')
  const up = () => { };
  // const layout = [ 
  //   { i: 'c', x: 4, y: 10, w: 1, h: 2 }
  // ];
  const [layout,setLayout] = useState([]) 
  const target = useRef();

  const onDrop = (layout, oldItem, e,a,b) => {
    console.log('当元素从外部放入网格中时调用',layout,oldItem,e)
    console.log(e.dataTransfer.getData('text'),44444)
    setLayout(layout)
    // left = e.pageX - page.current.offsetLeft;
    // top = e.pageY;
    // setStyle({
    //   ...style,
    //   left,
    //   top,
    // });
    const type = e.dataTransfer.getData('text')
    dispatch({
      type: "selected/add",
      payload: {
        type
      },
    });
  };
 
  return (
    <PageDiv
      // ref={page}
      // onDrop={onDrop}
      // onDragOver={(e) => {
      //   e.preventDefault();
      // }}
    >
      <GridLayout 
        style={{minHeight:700}}
        className="layout" 
        layout={layout}  //
        cols={1} 
        rowHeight={80}
        width={500} 
        autoSize={true} //容器高度自适应
        compactType={'vertical'} 
        draggableCancel='' //不可拖动的class  .test
        draggableHandle=''  //用于标记的CSS选择器，它将用作可拖动的句柄
        containerPadding={[0,0]}  //整个容器边距
        isDroppable={true} //如果为true，则可以将可放置元素（具有`draggable = {true}`属性）//放置在网格上。它使用位置和事件对象作为参数触发// “ onDrop”回调。//对于将元素放在特定位置很有用
        isDraggable={true} //是否可拖动
        isResizable={true} //是否可调整大小
        isBounded ={true} //只能在父级内移动
        resizeHandles={['s']} //句柄位置
        margin={[0,0]}  //每个子项目边距
        CSSTransforms={false} //css3替换top left，提高性能
        transformScale={1}  //拖动速度比例
        preventCollision={false} //拖动后不会调换位置
        onDrop={onDrop}  //data参数（ layout, oldItem, newItem, placeholder, e, element） 已删除？
        onLayoutChange={(data)=>{console.log('回调，因此您可以保存布局',data)}}
        onDropDragOver={data=>{console.log('当元素从外部从上方拖到网格上方时调用',data)}}  //已删除？
        onDragStart={(data,a,b,c,d,e,f)=>{console.log('拖动开始时调用',data,a,b,c,d,e,f)}}
        onDragStop={data=>{console.log('拖动完成时调用。',data)}}
        onResizeStart={data=>{console.log('调整大小开始时调用',data)}}
        onResize={data=>{console.log('发生尺寸调整移动时调用',data)}}
        onResizeStop={data=>{console.log('调整大小后调用',data)}}
        //innerRef={}  //Ref获取网格包装div的参考  //已删除？
      >
        {
          layout.map((item,index)=>{
            return <div key={index}>{item.i}</div>
          })
        }
      </GridLayout>

      {/* {
        selected.length && selected.map((item,index)=>(
          <DragDiv className="drag" style={{
            position: "absolute",
            top: item.t,
            left: item.l,
            width: item.w,
            height: item.h,
            zIndex: item.order
          }} ref={target} key={index} onMouseDown={down} onMouseMove = {move}>
            <EditorPoint className="point-top"></EditorPoint>
            <EditorPoint className="point-top-right"></EditorPoint>
            <EditorPoint className="point-right"></EditorPoint>
            <EditorPoint className="point-bottom-right"></EditorPoint>
            <EditorPoint className="point-bottom"></EditorPoint>
            <EditorPoint className="point-bottom-left"></EditorPoint>
            <EditorPoint className="point-left"></EditorPoint>
            <EditorPoint className="point-top-left"></EditorPoint>
          </DragDiv>
        ))
      } */}

    </PageDiv>
  );
};

export default Drag1;
