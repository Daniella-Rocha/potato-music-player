import { useState } from 'react';
const ChangeTheme = () => {

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    return (
        <div>
            <button type="button">mudar tema</button>
        </div>
    )
}

export default ChangeTheme
