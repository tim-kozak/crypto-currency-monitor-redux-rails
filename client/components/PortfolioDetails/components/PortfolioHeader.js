import React, {useState} from 'react';
import s from './PortfolioHeader.module.scss'
import cn from 'classnames/bind';

export const PortfolioHeader = (props) => {
    const {title,subtitle,canEdit,handleTitleChange} = props;

    const [state,setState] = useState({
        isEditingName: false,
        title: title
    });

    const handleSetEditing = () => {

        if (!canEdit) return;

        setState({
            ...state,
            title: title,
            isEditingName: true
        })
    };

    const handleInputChange = (e) => {
        setState({
            ...state,
            title: e.target.value
        })
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setState({
            ...state,
            title: title,
            isEditingName: false
        });
    };
    const handleSubmitTitle = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const newTitle = data.get("title");
        handleTitleChange(newTitle);
        setState({
            ...state,
            title: newTitle,
            isEditingName: false
        });
    };

    const styles = {
        header: s.header,
        canEdit: s.canEdit
    };
    let cx = cn.bind(styles);

    return (
        <div className={ cx(styles.header, { canEdit: !!canEdit }) }>
            {
                !state.isEditingName
                    ?
                    (<h2 onClick={handleSetEditing}>
                        {title}
                        <span className={s.editName}>edit</span>
                        <span className={s.subtitle}>{subtitle}</span>
                    </h2>)
                    :
                    (<form onSubmit={handleSubmitTitle}>
                        <input name="title" value={state.title} onChange={handleInputChange} type="text"/>
                        <button type="cancel" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Save</button>
                    </form>)
            }
        </div>
    );
};