import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { decode as base64Decode } from 'base-64';
import { contentType, AgentRoles, ErrorTypes, RenderType } from '../../types/models';
import { Project } from '../../types/models/project';
import { ProjectHero } from './ProjectHero';
import { ProjectOverview } from './ProjectOverview';
import { ProjectDashboard } from './ProjectDashboard';
import { ProjectNewClaim } from './ProjectNewClaim';
import { ProjectSingleClaim } from './ProjectSingleClaim';
import { ProjectClaims } from './ProjectClaims';
import styled from 'styled-components';
import { ProjectAgents } from './ProjectAgents';
import { Spinner } from '../common/Spinner';
import { UserInfo } from '../../types/models';
import { ProjectSidebar } from './ProjectSidebar';
import * as Toast from '../helpers/Toast';
import { deviceWidth } from '../../lib/commonData';
import { ProjectClaimSubmitted } from './ProjectClaimSubmitted';
import { explorerSocket } from '../helpers/explorerSocket';

const placeholder = require('../../assets/images/ixo-placeholder-large.jpg');

const Loading = styled.div`
	text-align: center;
	color: white;
	display:flex;
	justify-content:center;
	align-items:center;
	background: ${props => props.theme.bg.blue};
	padding: 50px 20px;
`;

const DetailContainer = styled.div`
	background: ${props => props.theme.bg.gradientBlue};
	display:block;
	flex: 1 1 auto;
	
	@media (min-width: ${deviceWidth.mobile}px) {
		display:flex;
	}
`;
export interface State {
	imageLink: string;
	projectPublic: Object;
	projectDid: string;

	isModalOpen: boolean;
	modalData: any;

	claims: Object[];
	serviceProviders: any[];
	investors: any[];
	evaluators: any[];
	userRoles: AgentRoles[];
	claimSubmitted: boolean;
	claimEvaluated: boolean;
	singleClaimFormFile: string;
	singleClaimDependentsFetched: boolean;
	singleClaim: Object;
}

export interface StateProps {
	ixo?: any;
	keysafe?: any;
	userInfo?: UserInfo;
}

export interface DispatchProps {
}

export interface ParentProps {
	location: any;
	contentType: contentType;
	match: any;
}

export interface Props extends ParentProps, StateProps, DispatchProps {}

export class ProjectContainer extends React.Component<Props, State> {
	state = {
		projectDid: this.props.match.params.projectDID,
		projectPublic: (this.props.location.state && this.props.location.state.projectPublic) ? this.props.location.state.projectPublic : null,
		imageLink: (this.props.location.state && this.props.location.state.imageLink) ? this.props.location.state.imageLink : placeholder,
		isModalOpen: false,
		modalData: {},
		claims: null,
		serviceProviders: null,
		investors: null,
		evaluators: null,
		userRoles: null,
		claimSubmitted: false,
		claimEvaluated: false,
		singleClaimFormFile: '',
		singleClaimDependentsFetched: false,
		singleClaim: null
	};

	handleToggleModal = (data: any, modalStatus: boolean) => {
		this.setState({ modalData: data, isModalOpen: modalStatus });
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.contentType === contentType.newClaim) {
			this.setState({ claimSubmitted: false, singleClaimDependentsFetched: false });
		}
	}

	componentDidMount() {
		this.handleGetProjectData();

		explorerSocket.on('claim added', (data: any) => {
			this.handleGetProjectData(true);
		});
		
		explorerSocket.on('claim updated', (data: any) => {
			this.handleGetProjectData(true);
		});

		explorerSocket.on('agent added', (data: any) => {
			this.handleGetProjectData(true);
		});
		
		explorerSocket.on('agent updated', (data: any) => {
			this.handleGetProjectData(true);
		});
	}

	singleClaimDependentsFetchedCallback = () => {
		this.setState({ singleClaimDependentsFetched: false });
	}

	getImageLink = (project) => {
		return project.serviceEndpoint + 'public/' + project.imageLink;
	}

	handleGetProjectData = (autorefresh?: boolean) => {
		if (autorefresh === true || this.state.projectPublic === null) {
			const did = this.props.match.params.projectDID;
			this.props.ixo.project.getProjectByProjectDid(did).then((response: any) => {
				const project: Project = response.data;
				this.setState({
					projectPublic: project,
					imageLink: this.getImageLink(project)
				});

				this.handleGetCapabilities();
			}).catch((result: Error) => {
				Toast.errorToast(result.message, ErrorTypes.goBack);
			});
		} else {
			this.handleGetCapabilities();
		}
	}

	handleGetCapabilities = () => {
		const userRoles = [];
		const userInfo: UserInfo = this.props.userInfo;
		if (userInfo) {
			this.state.projectPublic.agents.map((agent) => {
				if (agent.did === userInfo.didDoc.did) {
					userRoles.push(agent.role);
				}
			});
			if (this.state.projectPublic.createdBy === userInfo.didDoc.did) {
				userRoles.push(AgentRoles.owners);
			}
		}
		this.setState({ userRoles: userRoles });
	}

	handleHasCapability = (roles: AgentRoles[]) => {
		const userInfo: UserInfo = this.props.userInfo;
		let found = false;
		if (userInfo) {
			if (this.state.projectPublic.createdBy === userInfo.didDoc.did) {
				if (roles.some((val) => { return val === AgentRoles.owners; })) {
					return true;
				}
			}
			this.state.projectPublic.agents.forEach((agent) => {
				if (agent.did === userInfo.didDoc.did) {
					if (roles.some((val) => { return val === agent.role; })) {
						found = true;
					}
				}
			});
		}
		return found;
	}

	handleListClaims = () => {
		if (this.state.claims === null) {
			const ProjectDIDPayload: Object = { projectDid: this.state.projectDid };
			this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {
				if (!error) {
					this.props.ixo.claim.listClaimsForProject(ProjectDIDPayload, signature, this.state.projectPublic.serviceEndpoint).then((response: any) => {
						if (response.error) {
							Toast.errorToast(response.error.message, ErrorTypes.goBack);
						} else {
							let claimsObj = [];
							if (this.state.claims !== null) {
								claimsObj = [...this.state.claims];
							}
							claimsObj = response.result;
							console.log('private claims: ', claimsObj);
							this.setState({ claims: [...claimsObj] });
						}
					}).catch((result: Error) => {
						Toast.errorToast(result.message, ErrorTypes.goBack);
					});
				} else {
					Toast.errorToast(error, ErrorTypes.goBack);
				}
			}, 'base64');
		}
	}

	handleRenderClaims = (renderType: RenderType) => {
		if (this.state.projectPublic.claims === null) {
			this.handleGetProjectData();
			return <Spinner info="Loading..." />;
		} else if (renderType === RenderType.widget) {
			return <ProjectClaims hasLink={true} fullPage={false} claims={this.state.projectPublic.claims} projectDid={this.state.projectDid} />;
		} else if (this.state.projectPublic.claims.length > 0) {
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={'claims'} projectDid={this.state.projectDid} hasCapability={this.handleHasCapability} singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback} />
						<ProjectClaims hasLink={true} fullPage={true} claims={this.state.projectPublic.claims} projectDid={this.state.projectDid} />
					</DetailContainer>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={'claims'} projectDid={this.state.projectDid} hasCapability={this.handleHasCapability} singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback} />
						<Loading className="container-fluid"><p>There are currently no recorded claims on this project. <br/>Check back soon or get involved yourself.</p></Loading>
					</DetailContainer>
				</Fragment>
			);
		}
	}

	handleRenderAgents = (agentRole: string) => {
		if (this.state[agentRole] === null) {
			this.handleListAgents(agentRole);
			return <Spinner info="Loading agents..." />;
		} else if (this.state[agentRole].length > 0) {
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={agentRole} projectDid={this.state.projectDid} hasCapability={this.handleHasCapability} singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback} />
						<ProjectAgents agents={...this.state[agentRole]} handleUpdateAgentStatus={this.handleUpdateAgent} />
					</DetailContainer>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={agentRole} projectDid={this.state.projectDid} hasCapability={this.handleHasCapability} singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback} />
						<Loading className="container-fluid"><p>There are currently no recorded agents on this project. <br/>Check back soon or get involved yourself.</p></Loading>
					</DetailContainer>
				</Fragment>
			);
		}
	}

	handleListAgents = (agentRole: string) => {
		if (this.state[agentRole] === null) {
			const ProjectDIDPayload: Object = { projectDid: this.state.projectDid, role: AgentRoles[agentRole] };
			this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {
				if (!error) {
					this.props.ixo.agent.listAgentsForProject(ProjectDIDPayload, signature, this.state.projectPublic.serviceEndpoint).then((response: any) => {
						if (response.error) {
							Toast.errorToast(response.error.message, ErrorTypes.goBack);
							console.log('error occured', response.error);
						} else {
							let agentsObj = [];
							if (this.state[agentRole] !== null) {
								agentsObj = [...this.state[agentRole]];
							}
							agentsObj = response.result;

							// @ts-ignore
							this.setState({ [agentRole]: [...agentsObj] });
						}
					}).catch((result: Error) => {
						console.log((result));
					});
				} else {
					console.log(error);
				}
			}, 'base64');
		}
	}

	checkUserDid = () => {
		if (this.props.keysafe === null || this.props.userInfo === null) {
			window.alert('Please install IXO Credential Manager first.');
			return false;
		} else {
			return true;
		}
	}

	handleCreateAgent = (agentFormData) => {
		if (this.checkUserDid() == null) {
			return;
		}
		const agentData = {
			email: agentFormData.email,
			name: agentFormData.name,
			role: agentFormData.role,
			agentDid: this.props.userInfo.didDoc.did,
			projectDid: this.state.projectDid
		};
		this.props.keysafe.requestSigning(JSON.stringify(agentData), (error: any, signature: any) => {
			if (!error) {
				this.props.ixo.agent.createAgent(agentData, signature, this.state.projectPublic.serviceEndpoint).then((res) => {
					if (res.error !== undefined) {
						Toast.errorToast(res.error.message);
					} else {
						Toast.successToast(`Successfully registered as ${agentData.role}`);
					}
				});
			} else {
				Toast.errorToast('PDS is not responding');
			}
		}, 'base64');
	}

	handleUpdateAgent = (statusObj: any, did: string, role: string) => {
		let agentPaylod = {
			agentDid: did,
			status: statusObj.status,
			projectDid: this.state.projectDid,
			role: role
		};

		if (statusObj.version) {
			agentPaylod['version'] = statusObj.version;
		}

		this.props.keysafe.requestSigning(JSON.stringify(agentPaylod), (error, signature) => {
			if (!error) {
				this.props.ixo.agent.updateAgentStatus(agentPaylod, signature, this.state.projectPublic.serviceEndpoint).then((res) => {
					if (res.error !== undefined) {
						Toast.errorToast(res.error.message);
					} else {
						Toast.successToast(`Successfully updated agent status`);
					}
				});
			} else {
				Toast.errorToast('PDS is not responding');
			}
		}, 'base64');
	}

	handleEvaluateClaim = (statusObj: any, id: string) => {
		let claimPayload = {
			claimId: id,
			status: statusObj.status,
			projectDid: this.state.projectDid,
		};

		if (statusObj.version) {
			claimPayload['version'] = statusObj.version;
		}

		this.props.keysafe.requestSigning(JSON.stringify(claimPayload), (error, signature) => {
			if (!error) {
				this.props.ixo.claim.evaluateClaim(claimPayload, signature, this.state.projectPublic.serviceEndpoint).then((res) => {
					if (res.error !== undefined) {
						Toast.errorToast(res.error.message);
					} else {
						Toast.successToast('Evaluation succesfully submitted');
						this.setState({ claimEvaluated: true });
					}
				});
			} else {
				Toast.errorToast('Evaluation was not submitted');
			}
		}, 'base64');
	}

	handleSubmitClaim = (claimData) => {
		let claimPayload = Object.assign(claimData);
		claimPayload['projectDid'] = this.state.projectDid;
		this.props.keysafe.requestSigning(JSON.stringify(claimPayload), (error, signature) => {
			if (!error) {
				this.props.ixo.claim.createClaim(claimPayload, signature, this.state.projectPublic.serviceEndpoint).then((response) => {
					Toast.warningToast('Claim has been submitted for approval');
					this.setState({ claimSubmitted: true });
				}).catch((claimError: Error) => {
					Toast.errorToast(claimError.message);
				});
			} else {
				Toast.errorToast(error);
				console.log(error);
			}
		}, 'base64');
	}

	handleGetClaim(ProjectDIDPayload: object, signature: string): Promise<any> {
		return new Promise((resolve) => {
			this.props.ixo.claim.listClaimsForProject(ProjectDIDPayload, signature, this.state.projectPublic.serviceEndpoint).then((response: any) => {
				if (response.error) {
					Toast.errorToast(response.error.message, ErrorTypes.goBack);
				} else {
					const claimFound = response.result.filter((theClaim) => theClaim.txHash === this.props.match.params.claimID)[0];
					return resolve(claimFound);
				}
			});
		});
	}

	handleFetchFormFile(claimFormKey: string, pdsURL: string): Promise<any> {
		return new Promise((resolve) => {
			this.props.ixo.project.fetchPublic(claimFormKey, pdsURL).then((res: any) => {
				let fileContents = base64Decode(res.data);
				return resolve(fileContents);
			});
		});
	}

	handleSingleClaimFetch = (project: any) => {
		const ProjectDIDPayload: Object = { projectDid: this.state.projectDid };
		this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {
			if (!error) {
				const claimPromise = this.handleGetClaim(ProjectDIDPayload, signature); // get claim
				const formFilePromise = this.handleFetchFormFile(project.templates.claim.form, this.state.projectPublic.serviceEndpoint); // get form file
				Promise.all([claimPromise, formFilePromise]).then(([claim, formFile]) => {
					if (claim.evaluations.length > 0) {
						this.setState({ singleClaim: claim, singleClaimFormFile: formFile, singleClaimDependentsFetched: true, claimEvaluated: true });
					} else {
						this.setState({ singleClaim: claim, singleClaimFormFile: formFile, singleClaimDependentsFetched: true, claimEvaluated: false });
					}
					this.handleFetchClaimImages(formFile, claim); // go fetch images
				});
			} else {
				console.log(error);
			}
		}, 'base64');
	}

	handleFetchClaimImages = (formFile: any, claim: any) => {
		const { fields = [] } = JSON.parse(formFile);
		let promises = [];
		fields.forEach(field => {
			if (field.type === 'image') {
				promises.push(
					this.props.ixo.project.fetchPublic(claim[field.name], this.state.projectPublic.serviceEndpoint).then((res: any) => {
						let imageSrc = 'data:' + res.contentType + ';base64,' + res.data;
						claim[field.name] = imageSrc;
						this.setState({ singleClaim: claim });
					})
				);
			}
		});
		Promise.all(promises);
	}

	handleRenderProject = () => {
		if (this.state.projectPublic === null || this.state.userRoles === null) {
			return <Spinner info="Loading Project..." />;
		} else {
			const project = this.state.projectPublic;
			switch (this.props.contentType) {
				case contentType.overview:
					return (
						<Fragment>
							<ProjectHero project={project} match={this.props.match} isDetail={false} hasCapability={this.handleHasCapability} />
							<ProjectOverview
								checkUserDid={this.checkUserDid}
								createAgent={this.handleCreateAgent}
								userInfo={this.props.userInfo}
								project={project}
								id={project._id}
								isModalOpen={this.state.isModalOpen}
								toggleModal={this.handleToggleModal}
								modalData={this.state.modalData}
								hasCapability={this.handleHasCapability}
								imageLink={this.state.imageLink}
							/>
						</Fragment>
					);
				case contentType.dashboard:
					if (this.state.projectPublic.claims === null) {
						return <Spinner info="Loading claims..." />;
					} else {
						const dashboardClaimStats = Object.assign({ required: this.state.projectPublic.requiredClaims }, this.state.projectPublic.claimStats);
						return (
							<Fragment>
								<ProjectHero project={project} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
								<DetailContainer>
									<ProjectSidebar match={'detail'} projectDid={this.state.projectDid} hasCapability={this.handleHasCapability} singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback} />
									<ProjectDashboard
										project={this.state.projectPublic}
										projectDid={this.state.projectDid}
										agentStats={this.state.projectPublic.agentStats}
										hasCapability={this.handleHasCapability}
										claimStats={dashboardClaimStats}
										claims={this.state.projectPublic.claims}
										impactAction={this.state.projectPublic.impactAction}
									/>

								</DetailContainer>
							</Fragment>
						);
					}
				case contentType.newClaim:
					return (
						<Fragment>
							<ProjectHero isClaim={true} project={project} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
							{(this.state.claimSubmitted) ?
								<ProjectClaimSubmitted projectDid={this.state.projectDid} /> :
								<DetailContainer>
									<ProjectSidebar match={'claims'} projectDid={this.state.projectDid} hasCapability={this.handleHasCapability} singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback} />
									<ProjectNewClaim projectData={project} ixo={this.props.ixo} submitClaim={(claimData) => this.handleSubmitClaim(claimData)} />
								</DetailContainer>
							}
						</Fragment>
					);
				case contentType.singleClaim:
					if (!this.state.singleClaimDependentsFetched) {
						this.handleSingleClaimFetch(project);
						return <Spinner info="Loading claim..." />;
					}
					return (
						<Fragment>
							<ProjectHero isClaim={true} project={project} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
							<DetailContainer>
								<ProjectSidebar match={'claims'} projectDid={this.state.projectDid} hasCapability={this.handleHasCapability} singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback} />
								<ProjectSingleClaim
									singleClaimFormFile={this.state.singleClaimFormFile}
									claim={this.state.singleClaim}
									claimEvaluated={this.state.claimEvaluated}
									match={this.props.match}
									handleListClaims={this.handleListClaims}
									handleEvaluateClaim={this.handleEvaluateClaim}
									hasCapability={this.handleHasCapability}
									singleClaimDependentsFetchedCallback={this.singleClaimDependentsFetchedCallback}
								/>
							</DetailContainer>
						</Fragment>
					);
				case contentType.claims:
					return this.handleRenderClaims(RenderType.fullPage);
				case contentType.evaluators:
					return this.handleRenderAgents('evaluators');
				case contentType.investors:
					return this.handleRenderAgents('investors');
				case contentType.serviceProviders:
					return this.handleRenderAgents('serviceProviders');
				default:
					return <p>Nothing to see here...</p>;
			}
		}
	}

	render() {
		return (
			<Fragment>
				{this.handleRenderProject()}
			</Fragment>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
		keysafe: state.keysafeStore.keysafe,
		userInfo: state.loginStore.userInfo,
	};
}

export const ProjectContainerConnected = withRouter<Props & RouteComponentProps<{}>>(connect(
	mapStateToProps,
)(ProjectContainer as any) as any);