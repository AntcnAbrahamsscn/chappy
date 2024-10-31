
import "./chat-styles.css";

import { CiLocationArrow1 } from "react-icons/ci";

const ChatInputField = () => {
  

    // TODO: Lägg till i zustan

    return (
        
            <div className="input-container">
                <input type="text" placeholder="Type something fun!" />
                <button>
                    <CiLocationArrow1 size={20} />
                </button>
            </div>
    );
};

export default ChatInputField;
