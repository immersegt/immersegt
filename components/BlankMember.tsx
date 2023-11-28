import '../styles/index.css';
import '../styles/teammember.css';

interface MemberItemProps {
    name: string,
}

const BlankMember = ({ name }: MemberItemProps) => {
    return (
        <div className="blankMemberItem">
            <h3 className="blankMemberName nowrap"><i>{name}</i></h3>
        </div>
    )
}

export default BlankMember;