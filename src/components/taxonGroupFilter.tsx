const GroupFilter = () => {
    return (
        <div className='groupfilter'>
            <select name="Group">
                <option value= "all">All</option>
                <option value= "Amphibians">Amphibians</option>
                <option value = "Mammals">Mammals</option>
                <option value = "Birds">Birds</option>
                <option value = "Plants">Plants</option>
                <option value = "Butterflies and Moths">Butterflies and Moths</option>
                <option value = "Other Insects and Arthropods">Other Insects and Arthropods</option>
            </select>
        </div>
    )
}

export {GroupFilter};