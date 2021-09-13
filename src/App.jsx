import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  //Todoリスト
  const [todoText, setTodoText] = useState([]);
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  // 編集制御
  const [isEditable, setIsEditable] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  //作成フォームの状態制御
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  //編集フォームの状態制御
  const onChangeEditTodoText = (event) => setNewTitle(event.target.value);

  //追加ボタン
  const onClickAdd = () => {
    //空の場合は未完了リストへ追加しない
    if (todoText.length === 0) return;
    //未完了リストへ追加
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    //未完了リストへ追加後、入力フォームは空にする
    setTodoText("");
  };
  //編集ボタン処理
  const openEditForm = (index) => {
    //編集ボタンをクリックした＝編集フォームが開く
    setIsEditable(true);
    //実行されるたびにindexを受け取ってセットされる
    setEditIndex([index]);
    //未完了リストの特定の番目を編集フォームへ表示させる
    setNewTitle(incompleteTodos[index]);
  };
  //キャンセルボタン処理
  const closeEditForm = () => {
    setIsEditable(false);
    setEditIndex();
  };
  //削除ボタン処理
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  //完了ボタン処理
  const onClickComplete = (index) => {
    //完了ボタンをクリックした際、未完了のTODOから削除される
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    //完了ボタンをクリックした際、完了のTODOに追加される
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  //戻すボタン処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    // console.log(completeTodos);
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };
  //編集を保存ボタン処理
  const editTodo = (editIndex) => {
    incompleteTodos[editIndex] = newTitle;
    setIncompleteTodos(incompleteTodos);
    closeEditForm();
    setNewTitle("");
  };
  return (
    <>
      {(() => {
        if (!isEditable) {
          return (
            <>
              {/* 入力フォーム */}
              <div className="input-area">
                <input
                  placeholder="TODOを入力"
                  value={todoText}
                  onChange={onChangeTodoText}
                />
                <button onClick={onClickAdd}>追加</button>
              </div>
            </>
          );
        } else {
          return (
            <>
              {/* 編集フォーム*/}
              <div className="input-area">
                <input
                  placeholder="編集を入力"
                  value={newTitle}
                  onChange={onChangeEditTodoText}
                />
                <button onClick={() => editTodo(editIndex)}>編集を保存</button>
                <button onClick={closeEditForm}>キャンセル</button>
              </div>
            </>
          );
        }
      })()}
      {/* 未完了リスト */}
      <div className="incomplate-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((newTitle, index) => {
            return (
              <div key={newTitle} className="list-row">
                <li>{newTitle}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button key={editIndex} onClick={() => openEditForm(index)}>
                  編集
                </button>
                {/* 関数に引数を渡す場合アロー関数で記述 */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complate-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
