import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import ProjectProp from './ProjectProp';
import ProjectAction from '../ProjectAction';
import CreateTime from '../CreateTime';
import Detail from '../Detail';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CheckConnectionIcon } from 'assets/images/check-connect.svg';
import createWorkFlow from 'assets/images/create-work-flow.svg';
import ProjectName from '../ProjectName';
import { useHistory } from 'react-router-dom';
import { Project } from 'typings/project';
import ProjectConnectionStatus from '../ConnectionStatus';
import { MixinCommonTransition } from 'styles/mixins';

const CardContainer = styled.div`
  ${MixinCommonTransition('transform')}

  height: 208px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--gray3);
  border-radius: 4px;
  box-shadow: 0px 4px 10px var(--gray2);

  &:hover {
    transform: translateY(-2px);
  }
`;
const CardHeaderContainer = styled.div`
  display: flex;
  height: 40px;
  border-bottom: 1px solid var(--gray3);
  justify-content: space-between;
  cursor: pointer;

  .project {
    &-time {
      min-width: 146px;
    }
  }
`;
const CardMainContainer = styled.div`
  display: flex;
  padding: 25px 0;

  .project {
    &-work-flow-number {
      display: block;
      margin-top: 14px;
      font-size: 32px;
      line-height: 22px;
      color: var(--textColor);
      font-family: Clarity Mono;
    }
    &-connection-status-wrapper {
      margin-top: 12px;
    }
  }
`;
const CardFooterContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  .right {
    flex: 1;
    font-size: 12px;
    line-height: 22px;
    color: var(--gray7);
    padding-left: 6px;
  }
  .left {
    display: flex;
    min-width: 80px;
    justify-content: space-between;
  }
`;
const CheckConnectionStyle = styled.div`
  height: 24px;
  width: 24px;
  padding: 2px 6px 0;
  border-radius: 12px;
  cursor: pointer;
  path {
    stroke: #4e4f69;
  }
  &:hover {
    background-color: var(--gray1);
    path {
      stroke: var(--primaryColor);
    }
  }
`;

interface CardProps {
  item: Project;
}

interface CardHeaderProps {
  name: string;
  time: number;
}

interface CardMainProps {
  workFlowNumber: number;
  connectionStatus: number;
}

interface CardFooterProps {
  project: Project;
}

function CardHeader({ name, time }: CardHeaderProps): ReactElement {
  return (
    <CardHeaderContainer>
      <ProjectName text={name} />
      <div className="project-time">
        <CreateTime time={time} />
      </div>
    </CardHeaderContainer>
  );
}

function CardMain({ workFlowNumber }: CardMainProps): ReactElement {
  //FIXME
  const random: number = Math.random() * 3.99;
  const connectionStatus = Math.floor(random);
  const { t } = useTranslation();
  return (
    <CardMainContainer>
      <ProjectProp describe={t('project.workflow_number')}>
        <strong className="project-work-flow-number">{workFlowNumber}</strong>
      </ProjectProp>
      <ProjectProp describe={t('project.connection_status')}>
        <div className="project-connection-status-wrapper">
          <ProjectConnectionStatus connectionStatus={connectionStatus} />
        </div>
      </ProjectProp>
    </CardMainContainer>
  );
}

function CreateWorkFlow(): ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Tooltip title={t('project.create_work_flow')} placement="top">
      <img onClick={goCreateWorkflow} src={createWorkFlow} style={{ cursor: 'pointer' }} alt="" />
    </Tooltip>
  );

  function goCreateWorkflow() {
    history.push('/workflows/initiate/basic');
  }
}

function CheckConnection(): ReactElement {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('project.check_connection') + ' (Not ready yet)'} placement="top">
      <CheckConnectionStyle>
        <CheckConnectionIcon />
      </CheckConnectionStyle>
    </Tooltip>
  );
}

function CardFooter({ project }: CardFooterProps): ReactElement {
  const history = useHistory();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  return (
    <CardFooterContainer>
      {/* fixme */}
      <div className="right">{'陈盛明'}</div>
      <div className="left">
        <CheckConnection />
        <CreateWorkFlow />
        <ProjectAction
          onEdit={() => {
            history.push({
              pathname: '/projects/edit',
              state: {
                project,
              },
            });
          }}
          onDetail={() => setIsDrawerVisible(true)}
        />
      </div>
      <Detail
        title={project.name}
        project={project}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
      />
    </CardFooterContainer>
  );
}

function Card({ item }: CardProps): ReactElement {
  return (
    <CardContainer>
      <CardHeader name={item.name} time={item.created_at} />
      {/* fixme */}
      <CardMain workFlowNumber={2} connectionStatus={1} />
      <CardFooter project={item} />
    </CardContainer>
  );
}

export default Card;
