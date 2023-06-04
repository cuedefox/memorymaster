import { useState } from "react";
import {Link} from "react-router-dom";
import icon from "../assets/img/icon.svg";
import soundIcon from "../assets/img/soundIcon.svg";
import noSoundIcon from "../assets/img/noSoundIcon.svg";
import song from "../assets/audio/TombstoneCatsShortVersion.mp3";

const NavBar = () => {
    const [music, setMusic] = useState<boolean>(false);

    const turnMusic = (): void => {
        setMusic(!music);
    }

    return <nav>
        <Link to={'/'}>
            <div>
                <img src={icon} alt="Meow Match Icon" />
                <p>Meow Match</p>
            </div>
        </Link>
        <button onClick={turnMusic}>
            <img src={music ? soundIcon : noSoundIcon} alt="Sound Icon" />
        </button>
        {
            music ?
            <audio src={song} loop autoPlay />
            : ""
        }
    </nav>
}

export default NavBar;