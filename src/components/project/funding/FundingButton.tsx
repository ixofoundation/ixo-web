import * as React from 'react';
import { Button, ButtonTypes } from 'src/components/common/Buttons';
import { deviceWidth } from '../../../lib/commonData';
import styled from 'styled-components';
import { Web3Acc } from 'src/types/models/web3';

const ButtonWrapper = styled.div`

	a {
		display: flex;
		justify-content: center;
		flex-direction: row;
		width: 240px;	
		position: relative;
		font-size: 15px;
		margin-bottom: 0;
		p {
			margin: 0;
		}
		
		i {
			right: 20px;
			transform: rotate(-90deg);
			position: absolute;
			top: 14px;
			font-size: 12px;
			font-weight: bold;
		}

		@media (min-width: ${deviceWidth.desktopLarge}px) {
			width: 290px;	
		}
	}
`;

export interface ParentProps {
	projectWalletAddress: string;
	account: Web3Acc;
	createProjectWallet: () => void;
}

export const FundingButton: React.SFC<ParentProps> = (props) => {

	if (props.projectWalletAddress === null) {
		return null;
	}
	if (props.projectWalletAddress === '0x0000000000000000000000000000000000000000') {
		return (
			<ButtonWrapper>
				<Button type={ButtonTypes.dark} onClick={props.createProjectWallet}><p>Create Project Wallet</p> <i className="icon-down" /></Button>
			</ButtonWrapper>
		);
	}
	return (
		<ButtonWrapper>
			<Button type={ButtonTypes.dark} disabled={true}><p>Launch your project</p> <i className="icon-down" /></Button>
		</ButtonWrapper>
	);
};