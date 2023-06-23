import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ForumIcon from '@mui/icons-material/Forum';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import { Stack, MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ChatRoom from './ChatRoom';

function ChatButton() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleChatToggle = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    return (
        <>
            {!isChatOpen && (
                <Button
                    variant="contained"
                    startIcon={<ForumIcon />}
                    sx={{ position: 'fixed', right: 7, bottom: 7 }}
                    onClick={handleChatToggle}
                >
                    Chat
                </Button>
            )}
            {isChatOpen && (
                <div
                    style={{
                        position: 'fixed',
                        right: 7,
                        bottom: 7,
                        width: '40vw',
                        height: '60vh',
                        background: '#fff',
                        borderRadius: 5,
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {/* Content of the chat component */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" padding={1}>
                        <Typography variant="h6" color="#1976d2" paddingLeft="8px">
                            Chat
                        </Typography>

                        <IconButton
                            aria-label="delete"
                            sx={{ position: 'absolute', top: 0, right: 8 }}
                            onClick={handleCloseChat}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Stack>
                    <Divider variant="middle" />
                    <Stack direction="row" height="100%">
                        <Stack direction="column" width="210px" height="85%" sx={{ overflowY: 'scroll' }}>
                            <MenuItem>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Stack direction="column">
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={14}
                                                sx={{
                                                    maxWidth: 'calc(100% - 50px)',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                hangfei.three.vn
                                            </Typography>
                                            <Typography color="#666" fontSize={10}>
                                                11:14
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            sx={{
                                                maxWidth: 'calc(100% - 5px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Có rất nhiều mã giảm giá
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                            <MenuItem>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Stack direction="column">
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={14}
                                                sx={{
                                                    maxWidth: 'calc(100% - 50px)',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                hangfei.three.vn
                                            </Typography>
                                            <Typography color="#666" fontSize={10}>
                                                11:14
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            sx={{
                                                maxWidth: 'calc(100% - 5px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Có rất nhiều mã giảm giá
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                            <MenuItem>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Stack direction="column">
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={14}
                                                sx={{
                                                    maxWidth: 'calc(100% - 50px)',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                hangfei.three.vn
                                            </Typography>
                                            <Typography color="#666" fontSize={10}>
                                                11:14
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            sx={{
                                                maxWidth: 'calc(100% - 5px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Có rất nhiều mã giảm giá
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                            <MenuItem>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Stack direction="column">
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={14}
                                                sx={{
                                                    maxWidth: 'calc(100% - 50px)',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                hangfei.three.vn
                                            </Typography>
                                            <Typography color="#666" fontSize={10}>
                                                11:14
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            sx={{
                                                maxWidth: 'calc(100% - 5px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Có rất nhiều mã giảm giá
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                            <MenuItem>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Stack direction="column">
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={14}
                                                sx={{
                                                    maxWidth: 'calc(100% - 50px)',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                hangfei.three.vn
                                            </Typography>
                                            <Typography color="#666" fontSize={10}>
                                                11:14
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            sx={{
                                                maxWidth: 'calc(100% - 5px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Có rất nhiều mã giảm giá
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                            <MenuItem>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Stack direction="column">
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={14}
                                                sx={{
                                                    maxWidth: 'calc(100% - 50px)',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                hangfei.three.vn
                                            </Typography>
                                            <Typography color="#666" fontSize={10}>
                                                11:14
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            sx={{
                                                maxWidth: 'calc(100% - 5px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Có rất nhiều mã giảm giá
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                            <MenuItem>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://sieusao.vn/wp-content/uploads/2020/09/noo-phuoc-thinh.jpg"
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Stack direction="column">
                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="h6"
                                                fontSize={14}
                                                sx={{
                                                    maxWidth: 'calc(100% - 50px)',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                hangfei.three.vn
                                            </Typography>
                                            <Typography color="#666" fontSize={10}>
                                                11:14
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            fontSize={12}
                                            sx={{
                                                maxWidth: 'calc(100% - 5px)',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            Có rất nhiều mã giảm giá
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </MenuItem>
                        </Stack>
                        <Stack flex={1} direction="column" gap={1} alignItems="center" padding={4} height="80%">
                            <img
                                style={{ objectFit: 'contain' }}
                                width="100%"
                                height="100%"
                                src="assets/images/Chat.png"
                            />
                            <Typography variant="poster" fontWeight={700} textAlign="center" color="#7b8593">
                                Xin Chào!
                            </Typography>
                        </Stack>
                        {/* <Stack flex={1} direction="column" height="85%">
                            <ChatRoom />
                        </Stack> */}
                    </Stack>
                </div>
            )}
        </>
    );
}

export default ChatButton;
