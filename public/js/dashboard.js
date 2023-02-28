const bodyEvents = document.querySelector(`body`);
let currentBlockId;
let currentUserId;

bodyEvents.addEventListener(`click`, async (e) => {
    e.stopPropagation();

    blogBlock = e.target.closest(`.blog-block`);
    newBitDisp = e.target.closest(`.add-btn`);
    oldBitsDisp = e.target.closest(`.old-btn`);
    bitSubmitBtn = e.target.closest(`.bit-sub-btn-2`);
    bitDelete = e.target.closest(`.bit-bye-bye`);
    blockDelete = e.target.closest(`.block-bye-bye`);
    blockSubmitBtn = e.target.closest(`.block-submit-btn`);


    //get bit form elements
    const oldBits = document.querySelector(`#bits-box`);
    const newBit = document.querySelector(`#bit-form`);
    const textarea = document.querySelector(`#new-bit`);
    const bitBtn = document.querySelector(`#bit-btn`);
    const submitBtnEl = document.querySelector(`#bit-submit-btn-2`);

    if(blockDelete) {
        console.log(blockDelete); 
        const removeBlockIdRaw = blockDelete.id.match(/\w+(?=-)/);
        const removeBlockId = removeBlockIdRaw[0];
        const removeBlock = await fetch(`/api/blocks/${removeBlockId}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });

        location.reload();
    } else if (blogBlock){
        console.log(blogBlock);
        //get current block infor from click event
        const blockTitle = blogBlock.children[0].children[0].innerText;
        console.log(blockTitle)
        console.log(blogBlock.children[0].children[0])
        const blockContent = blogBlock.children[1].innerText;
        const blockDate = blogBlock.children[2].innerText;
        let blockUserRaw = blogBlock.children[3].innerText;
        blockUserRaw = blockUserRaw.match(/(?<=-)\w+\b/);
        const blockUser = blockUserRaw[0];
        console.log(blogBlock);
        blockId = blogBlock.id; 
        currentBlockId = blockId;
        console.log(currentBlockId);
        
        //get modal elements
        const modalHeader = document.querySelector(`#block-header`);
        const modalcontent = document.querySelector(`#block-content`);
        const modalDate = document.querySelector(`#block-date`);
        const modalUser = document.querySelector(`#block-user`);

        //fill modal content
        modalHeader.textContent = blockTitle;
        modalcontent.textContent = blockContent;
        modalDate.textContent = blockDate;
        modalUser.textContent = `by ` + blockUser;

        //update bits
        await fillBits();

        //display modal
        $(`#block-modal`).modal(`show`);
    //display new bit section
    } else if(newBitDisp) {
        //change button function
        bitBtn.textContent = `Old Bits`;
        bitBtn.classList.remove(`add-btn`);
        bitBtn.classList.add(`old-btn`);
        submitBtnEl.classList.remove(`hidden`);

        //display new bit textarea hide all other bits
        oldBits.classList.add(`hidden`);
        newBit.classList.remove(`hidden`);
        textarea.focus();
    } else if(bitSubmitBtn) {
        const newBitContent = textarea.value;
        console.log(currentBlockId);
        const bitObj = {bit_content: newBitContent, BlockId: currentBlockId};

        try{
            const fetchNewBit = await fetch(`api/bits`, {
                method:"POST",
                body: JSON.stringify(bitObj),
                headers:{
                    "Content-Type":"application/json"
                }
        })
            console.log(fetchNewBit);
        } catch(err) {
            return(err);
        }

        //update bits
        await fillBits();

        //change button function
        bitBtn.textContent = `Add Bit`;
        bitBtn.classList.add(`add-btn`);
        bitBtn.classList.remove(`old-btn`);

        //display old bits and hide textarea and submit button
        oldBits.classList.remove(`hidden`);
        newBit.classList.add(`hidden`);
        submitBtnEl.classList.add(`hidden`);
    } else if(oldBitsDisp) {
        //change button function
        bitBtn.textContent = `Add Bit`;
        bitBtn.classList.add(`add-btn`);
        bitBtn.classList.remove(`old-btn`);
        console.log(`why no change`);
        //display old bits and hide textarea and submit button
        oldBits.classList.remove(`hidden`);
        newBit.classList.add(`hidden`);
        submitBtnEl.classList.add(`hidden`);
    } else if(bitDelete) {
        const bitIdRaw = bitDelete.id.match(/\w+(?=-)/);
        const bitId = bitIdRaw[0];
        console.log(bitId);
        const removeBit = await fetch(`/api/bits/${bitId}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });

        fillBits();
    } else if(blockSubmitBtn) {
        const titleVal = document.querySelector(`#new-block-title`);
        const blockVal = document.querySelector(`#new-block`);
        const blockObj = {
            block_title: titleVal.value,
            content: blockVal.value
        }

        const newBlock = await fetch(`/api/blocks`, {
            method: "POST",
            body: JSON.stringify(blockObj),
            headers:{
                "Content-Type":"application/json"
            }
        });

        $(`#new-block-modal`).modal(`hide`);
        location.reload();
    }
});

const fillBits = async () => {
    //remove existing bits
    const currentBits = document.querySelectorAll(`.inner-bit-container`);

    console.log(currentBits);

    if(currentBits != []){
        currentBits.forEach(bit => {
            bit.remove();
        })
    }

    //fill bits(comments)
    //get bit data
    const blockBitsRaw = await fetch(`/api/bits/block/${blockId}`);
    const blockBits = await blockBitsRaw.json();
    console.log(blockBits);
    currentUserId = blockBits.currentUser;
    const blockBitsArray = blockBits.Bits;

    //get bit container and label
    const modalBits = document.querySelector(`#block-bits`);
    const bitsLabel = document.querySelector(`#bits-label`);

    if(blockBitsArray != []) {
        bitsLabel.classList.remove(`hidden`);
    }

    //create bits
    blockBitsArray.forEach(bit => {

        const bitUser = bit.User.user_name;
        const bitContent = bit.bit_content
        const bitDate = bit.formattedDate
        console.log(bitDate);

        const bitContainer = document.createElement(`div`);
        const bitHeader = document.createElement(`div`);
        const pEl1 = document.createElement(`p`);
        const pEl2 = document.createElement(`p`);
        const span = document.createElement(`span`);
        const delBtn = document.createElement(`button`);

        console.log(bitContainer);
        bitHeader.setAttribute(`class`, `d-flex flex-fill justify-content-between`);
        bitContainer.setAttribute(`class`, `inner-bit-container`)
        pEl1.setAttribute(`class`, `ps-2 pe-2 pb-2 fw-light`);
        pEl2.setAttribute(`class`, `ps-2 pt-2 mb-1 d-flex flex-fill justify-content-between small-font bottom-border`);
        span.setAttribute(`class`, `pe-2 text-end fw-light`)
        pEl1.textContent = bitContent;
        pEl2.textContent = `${bitUser} added this bit`
        span.textContent = `${bitDate}`

        bitHeader.appendChild(pEl1);
        if(bit.User.id === currentUserId || bit.BlockId === currentUserId){
            delBtn.setAttribute(`type`, `button`);
            delBtn.setAttribute(`id`, `${bit.id}-bit`);
            delBtn.setAttribute(`class`, `btn-close bit-bye-bye`);

            bitHeader.appendChild(delBtn);
        }

        pEl2.appendChild(span);
        bitContainer.appendChild(bitHeader);
        bitContainer.appendChild(pEl2);
        modalBits.appendChild(bitContainer);
    })
}