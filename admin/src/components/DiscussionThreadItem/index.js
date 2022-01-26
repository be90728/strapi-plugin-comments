/**
 *
 * Entity Details
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Initials } from '@strapi/design-system/Avatar';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Flex } from '@strapi/design-system/Flex';
import { Link } from '@strapi/design-system/Link';
import { Typography } from '@strapi/design-system/Typography';
import { ArrowRight } from '@strapi/icons';
import DiscussionThreadItemMeta from '../DiscussionThreadItemMeta';
import { AvatarWrapper, DiscussionThreadItemBox, DiscussionThreadItemBoxContent, DiscussionThreadItemContent, DiscussionThreadItemLeft, DiscussionThreadItemLinkBox, DiscussionThreadItemRight, DiscussionThreadItemRoot } from './styles';
import DiscussionThreadItemActions from '../DiscussionThreadItemActions';
import { getMessage, getUrl, renderInitials } from '../../utils';
import DiscussionThreadItemWarnings from '../DiscussionThreadItemWarnings';

const DiscussionThreadItem = (props) => {
    const { 
        isSelected, 
        isThreadAuthor, 
        content, 
        root, 
        preview, 
        pinned, 
        blocked, 
        removed, 
        blockedThread, 
        gotThread, 
        threadFirstItemId, 
        authorUser, 
        author } = props;

    let background = 'neutral100';
    let borderColor = 'neutral200';
    let dividerColor = 'neutral200';
    let StyledComponent = DiscussionThreadItemRight;

    if(isThreadAuthor || root){
        StyledComponent = DiscussionThreadItemLeft;
        borderColor = 'neutral100';
        dividerColor = 'neutral100';
        background = null;
    } 
    
    if (isSelected) {
        background = 'secondary100'
        borderColor = 'secondary500';
        dividerColor = 'secondary200';
    }

    if (root) {
        StyledComponent = DiscussionThreadItemRoot;
    }

    const avatar = author?.avatar || authorUser?.avatar;
    const name = author?.name || `${authorUser?.firstName} ${authorUser?.lastName}`;
    const isBlocked = blocked || blockedThread;
    
    return (<StyledComponent as="li">
        <DiscussionThreadItemContent as={Flex} direction="row">
            <AvatarWrapper>
                { avatar ? <Avatar src={avatar} alt={name} /> : <Initials>{ renderInitials(name) }</Initials> }
            </AvatarWrapper>
            <DiscussionThreadItemBox hasRadius shadow="filterShadow" borderColor={borderColor} background={background} padding={2}>
                <Flex as={Box} paddingBottom={2} direction="column">
                    <DiscussionThreadItemBoxContent as={Flex} direction="row">
                        <Box as={Flex} grow={1} alignItems="center">
                            <Typography variant="omega">{ content }</Typography>
                        </Box>
                        { !preview && (<DiscussionThreadItemActions { ...props } root={root || pinned} />) }
                    </DiscussionThreadItemBoxContent>
                    { !(preview || isBlocked || removed) && (<DiscussionThreadItemWarnings { ...props } gotThread={gotThread || root} />) }
                </Flex>
                <Divider background={dividerColor} />
                <DiscussionThreadItemMeta { ...props } />
            </DiscussionThreadItemBox>
        </DiscussionThreadItemContent>

        { (gotThread && !(removed || preview || pinned)) && (<DiscussionThreadItemLinkBox direction="column" alignItems="flex-end">
            <Link to={getUrl(`discover/${threadFirstItemId}`)} endIcon={<ArrowRight />}>
                { getMessage('page.details.panel.discussion.nav.drilldown') }
            </Link>
        </DiscussionThreadItemLinkBox>) }
    </StyledComponent>);
};

DiscussionThreadItem.propTypes = {
    content: PropTypes.string.isRequired,
    allowedActions: PropTypes.shape({
        canModerate: PropTypes.bool,
        canAccessReports: PropTypes.bool,
        canReviewReports: PropTypes.bool,
    }),
};

export default DiscussionThreadItem;
 