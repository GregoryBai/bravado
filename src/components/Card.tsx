import styled from 'styled-components'

const Container = styled.div<{selected: boolean}>`
	display: flex;
	justify-content: center;
	align-items: center;

	background: #fafafa;
	box-sizing: border-box;
	box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
	border-radius: 3px;
    overflow: hidden;

	height: 136px;
	width: 524px;
    // border: 1px solid transparent;

	{props => props.selected && 'border: 1px solid #4765ff;'}

	& img {
		width: 136px;
		height: 100%;
		object-fit: cover;
		background: rgba(0, 0, 0, 0.25);
	}
    
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
    
    & .name {
        font-size: 24px;
        color: #000;
    }

    & .email {
        // font-size: 14px;
        // color: rgba(0, 0, 0, 0.54);
    }

    & .role {
        // font-size: 14px;
        // color: rgba(0, 0, 0, 0.54);
        font-weight: bold;
    }
    & .address {
        // font-size: 14px;
        // color: #000;
    }
`

const Right = styled.div`
    height: 100%;
    
	flex: auto;
    display: flex;
    flex-direction: column;
    grid-gap: 3px;
`

const Info = styled.div`
	// padding: 10px 9px 19px 27px;
	padding: 10px 9px 0px 27px;
    flex: auto;
`


const Row = styled.div`
	display: flex;
	justify-content: space-between;
`

const Button = styled.div`
    color:  #009688;

	border: 1px solid rgba(0, 0, 0, 0.12);
	padding-top: 14px;
	padding-bottom: 19px;
    text-align: center;
    
    margin-top: auto;
`

type CardProps = {
	address: string;
avatar: string;
city: string;
email: string;
name: string;
title: string;

onSelect: (email:  string) => void;
selected: boolean;
searchInput: string;

}

const Card: React.FC<CardProps> = ({ address, avatar, city, email, name, title, onSelect, selected, searchInput }) => {
    // if (selected) console.log(email, selected)
	return (
		<Container onClick={() => onSelect(email)} selected={selected}>
			<img src={avatar} alt={name} />

			<Right>
                <Info>
				<Row>
					<p className='name' dangerouslySetInnerHTML={{__html: name.replace(searchInput, (match)=>`<mark>${match}</mark>`) }} />
					<p className='email'>{email}</p>
				</Row>
				<p className='role'>{title}</p>
				<p className='address'>{address}</p>
                </Info> 

                <Button>{selected ? "SKIP SELECTION" : "MARK AS SUITABLE"}</Button>

			</Right>
			<p className='name'></p>
		</Container>
	)
}

export default Card
