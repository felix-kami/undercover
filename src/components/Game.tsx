"use client";
import React, { FC, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { UserX, SkipForward, Check, X, Crown } from "lucide-react";

type Player = {
  id: number;
  name: string;
  role: "civilian" | "undercover" | "mrwhite";
  word: string;
  isAlive: boolean;
  description?: string;
  voteCount?: number;
};

const wordPairs = [
  { civilian: "Cà phê", undercover: "Trà" },
  { civilian: "Bánh mì", undercover: "Bánh bao" },
  { civilian: "Laptop", undercover: "Máy tính bàn" },
  { civilian: "Xe máy", undercover: "Xe đạp" },
  { civilian: "Bóng đá", undercover: "Bóng rổ" },
  { civilian: "Mèo", undercover: "Chó" },
  { civilian: "Facebook", undercover: "Instagram" },
  { civilian: "Coca", undercover: "Pepsi" },
  { civilian: "KFC", undercover: "McDonald" },
  { civilian: "iPhone", undercover: "Samsung" },
  { civilian: "Bia", undercover: "Rượu" },
  { civilian: "Trà sữa", undercover: "Sinh tố" },
  { civilian: "Nước ngọt", undercover: "Nước ép" },
  { civilian: "Xe hơi", undercover: "Xe tải" },
  { civilian: "Máy tính bảng", undercover: "Điện thoại thông minh" },
  { civilian: "Sách", undercover: "Báo" },
  { civilian: "Nhạc pop", undercover: "Nhạc rock" },
  { civilian: "Thành phố", undercover: "Làng quê" },
  { civilian: "Rạp chiếu phim", undercover: "Nhà hát" },
  { civilian: "Tivi", undercover: "Máy chiếu" },
  { civilian: "Hòa nhạc", undercover: "Buổi biểu diễn" },
  { civilian: "Mùa hè", undercover: "Mùa đông" },
  { civilian: "Nước mắm", undercover: "Tương ớt" },
  { civilian: "Phở", undercover: "Bún bò" },
  { civilian: "Cháo", undercover: "Xôi" },
  { civilian: "Cá", undercover: "Thịt" },
  { civilian: "Gà", undercover: "Vịt" },
  { civilian: "Đường", undercover: "Phố" },
  { civilian: "Lễ hội", undercover: "Hội chợ" },
  { civilian: "Sân bay", undercover: "Ga tàu" },
  { civilian: "Trường", undercover: "Cửa hàng" },
  { civilian: "Bác sĩ", undercover: "Y tá" },
  { civilian: "Kỹ sư", undercover: "Thợ máy" },
  { civilian: "Học sinh", undercover: "Giáo viên" },
  { civilian: "Sinh viên", undercover: "Giảng viên" },
  { civilian: "Bệnh viện", undercover: "Phòng khám" },
  { civilian: "Nông dân", undercover: "Người thành thị" },
  { civilian: "Thủ đô", undercover: "Thị trấn" },
  { civilian: "Quốc gia", undercover: "Khu vực" },
  { civilian: "Điện thoại", undercover: "Điện thoại cố định" },
  { civilian: "Bản đồ", undercover: "La bàn" },
  { civilian: "Máy ảnh", undercover: "Máy quay" },
  { civilian: "Đồng hồ", undercover: "Bấm giờ" },
  { civilian: "Nội thất", undercover: "Ngoại thất" },
  { civilian: "Hoa", undercover: "Cây xanh" },
  { civilian: "Đồi", undercover: "Sông" },
  { civilian: "Núi", undercover: "Biển" },
  { civilian: "Rừng", undercover: "Sa mạc" },
  { civilian: "Gió", undercover: "Mưa" },
  { civilian: "Sấm sét", undercover: "Sương mù" },
  { civilian: "Buổi sáng", undercover: "Buổi tối" },
  { civilian: "Ngày", undercover: "Đêm" },
  { civilian: "Tháng", undercover: "Năm" },
  { civilian: "Tiền", undercover: "Vàng" },
  { civilian: "Đồng", undercover: "Tiền giấy" },
  { civilian: "Lương", undercover: "Thưởng" },
  { civilian: "Thuế", undercover: "Phí" },
  { civilian: "Hạnh phúc", undercover: "Nỗi buồn" },
  { civilian: "Tình yêu", undercover: "Sự thù hận" },
  { civilian: "Hòa bình", undercover: "Chiến tranh" },
  { civilian: "Sự thật", undercover: "Sự giả dối" },
  { civilian: "Công lý", undercover: "Bất công" },
  { civilian: "Tự do", undercover: "Ràng buộc" },
  { civilian: "Nghệ thuật", undercover: "Khoa học" },
  { civilian: "Tri thức", undercover: "Trí tuệ" },
  { civilian: "Kinh nghiệm", undercover: "Lý thuyết" },
  { civilian: "Động lực", undercover: "Cảm hứng" },
  { civilian: "Đam mê", undercover: "Sự thờ ơ" },
  { civilian: "Tiền bạc", undercover: "Sự giàu có" },
  { civilian: "Năng lượng", undercover: "Sức mạnh" },
  { civilian: "Âm nhạc", undercover: "Hòa âm" },
  { civilian: "Đá banh", undercover: "Bóng chày" },
  { civilian: "Sân vận động", undercover: "Phòng tập" },
  { civilian: "Bàn cờ", undercover: "Cờ vua" },
  { civilian: "Trò chơi", undercover: "Trò đùa" },
  { civilian: "Tiếng cười", undercover: "Tiếng khóc" },
  { civilian: "Vũ điệu", undercover: "Cuộc đua" },
  { civilian: "Sự tĩnh lặng", undercover: "Sự ồn ào" },
  { civilian: "Tập thể dục", undercover: "Giải trí" },
  { civilian: "Thể thao", undercover: "Vui chơi" },
  { civilian: "Văn hóa", undercover: "Truyền thống" },
  { civilian: "Lịch sử", undercover: "Tương lai" },
  { civilian: "Đổi mới", undercover: "Sự bảo thủ" },
  { civilian: "Nhà sáng chế", undercover: "Nhà phát minh" },
  { civilian: "Sáng tạo", undercover: "Bản năng" },
  { civilian: "Tâm hồn", undercover: "Linh hồn" },
  { civilian: "Gia đình", undercover: "Bạn bè" },
  { civilian: "Người yêu", undercover: "Đối tác" },
  { civilian: "Cộng đồng", undercover: "Xã hội" },
  { civilian: "Chính trị", undercover: "Kinh tế" },
  { civilian: "Thế giới", undercover: "Vũ trụ" },
  { civilian: "Thiên văn", undercover: "Sinh học" },
  { civilian: "Hóa học", undercover: "Vật lý" },
  { civilian: "Công nghệ", undercover: "Kỹ thuật" },
  { civilian: "Robot", undercover: "Trí tuệ nhân tạo" },
  { civilian: "Máy móc", undercover: "Động cơ" },
  { civilian: "Tiến bộ", undercover: "Lạc hậu" },
  { civilian: "Mật khẩu", undercover: "Sinh trắc học" },
  { civilian: "Tín hiệu", undercover: "Kênh" },
  { civilian: "Mạng xã hội", undercover: "Diễn đàn" },
];

// Thêm nội dung luật chơi
const gameRules = [
  {
    title: "Mục tiêu",
    content:
      "- Dân thường: Tìm và loại Undercover và Mr. White\n- Undercover: Giả làm dân thường và loại họ\n- Mr. White: Đoán được từ của dân thường",
  },
  {
    title: "Cách chơi",
    content:
      "1. Mỗi người chơi sẽ được giao một vai trò và một từ (Mr. White không có từ)\n2. Lần lượt mô tả từ của mình mà không nói trực tiếp từ đó\n3. Sau mỗi vòng, người chơi bỏ phiếu loại một người\n4. Khi Mr. White bị vote, có cơ hội đoán từ để thắng",
  },
  {
    title: "Ví dụ cách mô tả",
    content:
      "Ví dụ cặp từ: Cà phê ⟷ Trà\n\n" +
      "Dân thường (Cà phê):\n" +
      '- "Thức uống này giúp tỉnh táo buổi sáng"\n' +
      '- "Màu đen, thường uống nóng"\n' +
      '- "Việt Nam nổi tiếng xuất khẩu loại hạt này"\n\n' +
      "Undercover (Trà):\n" +
      '- "Thức uống phổ biến mỗi sáng"\n' +
      '- "Có thể uống nóng hoặc đá"\n' +
      '- "Thường pha từ lá khô"\n\n' +
      "Mr. White:\n" +
      "- Lắng nghe kỹ và đoán từ chung của các mô tả\n" +
      "- Mô tả mập mờ để không bị lộ",
  },
  {
    title: "Mẹo chơi",
    content:
      "Dân thường:\n" +
      "- Mô tả đủ rõ để đồng đội hiểu nhưng không quá rõ để Undercover bắt chước\n" +
      "- Chú ý cách mô tả của người khác, tìm điểm khác biệt\n" +
      "- Có thể thử test người khác bằng cách mô tả chi tiết đặc trưng\n\n" +
      "Undercover:\n" +
      "- Cố gắng mô tả trùng với dân thường nhất có thể\n" +
      "- Không nên quá im lặng hoặc quá nổi bật\n" +
      "- Có thể giả vờ nghi ngờ người khác để đánh lạc hướng\n\n" +
      "Mr. White:\n" +
      "- Quan sát kỹ những người tự tin khi mô tả\n" +
      "- Mô tả mơ hồ, dùng từ có thể áp dụng cho nhiều thứ\n" +
      "- Khi bị vote, tập trung vào những mô tả rõ ràng nhất để đoán từ",
  },
  {
    title: "Điều kiện thắng",
    content:
      "- Dân thường thắng: Loại hết Undercover và Mr. White\n- Undercover thắng: số lượng Undercover còn lại bằng hoặc vượt quá số lượng dân thường \n- Mr. White thắng: Đoán đúng từ khi bị loại hoặc sống sót đến 2 người cuối",
  },
];

type GameState = "setup" | "naming" | "playing" | "voting" | "ended";

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Thêm constants cho số lượng người chơi
const MIN_PLAYERS = 4;
const MAX_PLAYERS = 100;
const DEFAULT_PLAYERS = 6;

const Game: FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameState, setGameState] = useState<GameState>("setup");
  const [playerCount, setPlayerCount] = useState<number | null>(
    DEFAULT_PLAYERS
  );
  const [winner, setWinner] = useState<string>("");
  const [currentPlayerView, setCurrentPlayerView] = useState<number>(0);
  const [showWord, setShowWord] = useState<boolean>(false);
  const [votingInProgress, setVotingInProgress] = useState<boolean>(false);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [canSkipVote, setCanSkipVote] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [mrWhiteGuess, setMrWhiteGuess] = useState<string>("");
  const [showMrWhiteGuessModal, setShowMrWhiteGuessModal] =
    useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [usedWordPairs, setUsedWordPairs] = useState<typeof wordPairs>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [playerToEliminate, setPlayerToEliminate] = useState<number | null>(
    null
  );
  console.log(`🚀🚀🚀 ~ playerToEliminate:`, playerToEliminate);
  const [showSkipConfirmModal, setShowSkipConfirmModal] =
    useState<boolean>(false);

  const debouncedName = useDebounce(inputName, 300);

  useEffect(() => {
    if (debouncedName && isNameDuplicate(debouncedName, currentPlayerView)) {
      toast.error("Tên này đã được sử dụng!", {
        duration: 1000,
        position: "top-center",
        style: {
          background: "#FF5555",
          color: "#fff",
        },
      });
    }
  }, [debouncedName]);

  useEffect(() => {
    const savedWords = localStorage.getItem("usedWordPairs");
    if (savedWords) {
      setUsedWordPairs(JSON.parse(savedWords));
    }
  }, []);

  const calculateRoles = (totalPlayers: number) => {
    let roles: ("civilian" | "undercover" | "mrwhite")[] = [];

    // Luôn có 1 Mr.White
    const mrwhiteCount = 1;

    // Tính số lượng undercover dựa trên số người chơi
    let undercoverCount = 1; // Mặc định là 1

    if (totalPlayers <= 16) {
      if (totalPlayers === 6) undercoverCount = 1;
      else if (totalPlayers <= 8) undercoverCount = 2;
      else if (totalPlayers <= 12) undercoverCount = 3;
      else if (totalPlayers <= 15) undercoverCount = 4;
      else undercoverCount = 5; // 16 người
    } else {
      undercoverCount = 1; // Trên 16 người chỉ có 1 undercover
    }

    // Số dân thường = tổng số người - (undercover + mrwhite)
    const civilianCount = totalPlayers - (undercoverCount + mrwhiteCount);

    // Tạo mảng roles
    roles = [
      ...Array(civilianCount).fill("civilian"),
      ...Array(undercoverCount).fill("undercover"),
      ...Array(mrwhiteCount).fill("mrwhite"),
    ];

    // Hiển thị thông báo phân chia role
    toast.success(
      `Phân chia role:\n` +
        `${civilianCount} Dân thường\n` +
        `${undercoverCount} Undercover\n` +
        `1 Mr.White`,
      { duration: 3000 }
    );

    // Trộn ngẫu nhiên các roles
    return roles.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    if (!playerCount || playerCount < MIN_PLAYERS) {
      return;
    }

    const availableWords = wordPairs.filter(
      (pair) =>
        !usedWordPairs.some(
          (used) =>
            used.civilian === pair.civilian &&
            used.undercover === pair.undercover
        )
    );

    if (availableWords.length === 0) {
      toast.error("Đã hết từ mới! Vui lòng xóa lịch sử để chơi lại.");
      return;
    }

    const selectedPair =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    const roles = calculateRoles(playerCount);
    const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);

    const newPlayers: Player[] = shuffledRoles.map((role, index) => ({
      id: index,
      name: "",
      role,
      word:
        role === "mrwhite"
          ? ""
          : role === "undercover"
          ? selectedPair.undercover
          : selectedPair.civilian,
      isAlive: true,
      voteCount: 0,
    }));

    // Lưu từ đã sử dụng
    const newUsedWords = [...usedWordPairs, selectedPair];
    setUsedWordPairs(newUsedWords);
    localStorage.setItem("usedWordPairs", JSON.stringify(newUsedWords));

    setPlayers(newPlayers);
    setGameState("naming");
    setCurrentRound(1);
  };

  const handleNameSubmit = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name;
    setPlayers(updatedPlayers);

    // Nếu là người cuối cùng, chuyển sang màn hình chơi
    if (index === players.length - 1) {
      setGameState("playing");
    } else {
      setCurrentPlayerView(index + 1);
    }
  };

  const checkGameEnd = (currentPlayers: Player[]) => {
    const alivePlayers = currentPlayers.filter((p) => p.isAlive);
    const aliveCivilians = alivePlayers.filter((p) => p.role === "civilian");
    const aliveUndercovers = alivePlayers.filter(
      (p) => p.role === "undercover"
    );
    const aliveMrWhites = alivePlayers.filter((p) => p.role === "mrwhite");

    // Dân thường thắng khi loại hết Undercover và Mr.White
    if (aliveUndercovers.length === 0 && aliveMrWhites.length === 0) {
      setWinner("civilian");
      setGameState("ended");
      setShowResults(true);
      toast.success("Dân thường đã chiến thắng! 🎉", { duration: 3000 });
      return;
    }

    // Mr.White thắng khi còn sống và chỉ còn 2 người chơi
    if (alivePlayers.length === 2 && aliveMrWhites.length > 0) {
      setWinner("mrwhite");
      setGameState("ended");
      setShowResults(true);
      toast.success("Mr.White đã chiến thắng! 🎭", { duration: 3000 });
      return;
    }

    // Undercover thắng khi số lượng Undercover >= số dân thường
    if (aliveUndercovers.length >= aliveCivilians.length) {
      setWinner("undercover");
      setGameState("ended");
      setShowResults(true);
      toast.success("Undercover đã chiến thắng! 🕵️", { duration: 3000 });
      return;
    }
  };

  const isNameDuplicate = (name: string, currentIndex: number) => {
    return players.some(
      (player, index) =>
        index !== currentIndex &&
        player.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
  };

  const handleContinue = () => {
    const currentName = inputName.trim();

    if (!currentName) {
      toast.error("Vui lòng nhập tên của bạn!", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#FF5555",
          color: "#fff",
        },
      });
      return;
    }

    if (isNameDuplicate(currentName, currentPlayerView)) {
      toast.error("Vui lòng chọn tên khác, tên này đã được sử dụng!", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#FF5555",
          color: "#fff",
        },
      });
      return;
    }

    if (!showWord) {
      toast.error("Vui lòng xem từ của bạn trước khi tiếp tục!", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#FF5555",
          color: "#fff",
        },
      });
      return;
    }

    handleNameSubmit(currentPlayerView, currentName);
    setShowWord(false);
    setInputName("");
  };

  const handleMrWhiteGuess = () => {
    const civilianWord = players.find((p) => p.role === "civilian")?.word || "";
    const updatedPlayers = [...players];
    const eliminatedPlayer = updatedPlayers.find(
      (p) => p.id === playerToEliminate
    );

    if (!eliminatedPlayer) {
      toast.error("Có lỗi xảy ra khi loại người chơi!");
      setShowMrWhiteGuessModal(false);
      setPlayerToEliminate(null);
      return;
    }

    if (mrWhiteGuess.trim().toLowerCase() === civilianWord.toLowerCase()) {
      setWinner("mrwhite");
      setGameState("ended");
      setShowResults(true);
      toast.success("Mr.White đã đoán đúng từ và chiến thắng! 🎭", {
        duration: 3000,
      });
    } else {
      eliminatedPlayer.isAlive = false;
      setPlayers(updatedPlayers);
      toast.error("Mr.White đã đoán sai từ và bị loại!", { duration: 3000 });
      checkGameEnd(updatedPlayers);
    }

    setShowMrWhiteGuessModal(false);
    setPlayerToEliminate(null);
    setMrWhiteGuess("");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const inputStyles =
    "w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg text-gray-900 font-medium placeholder-gray-500";

  const getFilteredPlayers = () => {
    return players.filter(
      (player) =>
        player.isAlive &&
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Thêm helper function để hiển thị role dễ đọc
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "civilian":
        return "Dân thường 👥";
      case "undercover":
        return "Undercover 🕵️";
      case "mrwhite":
        return "Mr. White 🎭";
      default:
        return role;
    }
  };

  const handleSkipVote = () => {
    setVotingInProgress(false);
    setSelectedVote(null);
    setCanSkipVote(false);
    setSearchTerm("");
    setCurrentRound((prev) => prev + 1);
    toast.success("Đã bỏ qua lượt vote này!");
  };

  const clearWordHistory = () => {
    localStorage.removeItem("usedWordPairs");
    setUsedWordPairs([]);
    toast.success("Đã xóa lịch sử từ đã chơi!", {
      duration: 2000,
      position: "top-center",
    });
  };

  // Thêm useEffect để handle body scroll
  useEffect(() => {
    const hasModalOpen =
      showRules ||
      showMrWhiteGuessModal ||
      showConfirmModal ||
      showResults ||
      showSkipConfirmModal;

    if (hasModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    showRules,
    showMrWhiteGuessModal,
    showConfirmModal,
    showResults,
    showSkipConfirmModal,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 to-purple-600 pb-20 pt-10">
      <Toaster />

      {/* Header cố định */}
      <div className="p-4 md:p-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
            Under Cover
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRules(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            Luật chơi
          </motion.button>
        </div>
      </div>

      {/* Main content có thể scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Các game state components */}
              {gameState === "setup" && (
                <motion.div
                  key="setup"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-xl p-6 shadow-xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Thiết lập trò chơi
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearWordHistory}
                      className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Xóa lịch sử từ
                    </motion.button>
                  </div>

                  <div className="mb-2 text-sm text-gray-600">
                    Số cặp từ còn lại: {wordPairs.length - usedWordPairs.length}
                    /{wordPairs.length}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-900 font-medium mb-2 text-lg">
                      Số người chơi:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={MIN_PLAYERS}
                        max={MAX_PLAYERS}
                        value={playerCount || ""}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setPlayerCount(value || null);
                        }}
                        className={`${inputStyles} flex-1`}
                      />
                      <span className="text-gray-600">
                        ({MIN_PLAYERS}-{MAX_PLAYERS} người)
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startGame}
                    disabled={
                      !playerCount ||
                      playerCount < MIN_PLAYERS ||
                      wordPairs.length === usedWordPairs.length
                    }
                    className={`w-full py-3 rounded-lg shadow-md font-medium ${
                      !playerCount || playerCount < MIN_PLAYERS
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : wordPairs.length === usedWordPairs.length
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                  >
                    {!playerCount || playerCount < MIN_PLAYERS
                      ? `Cần ít nhất ${MIN_PLAYERS} người chơi`
                      : wordPairs.length === usedWordPairs.length
                      ? "Đã hết từ mới"
                      : "Bắt đầu trò chơi"}
                  </motion.button>
                </motion.div>
              )}

              {gameState === "naming" && (
                <motion.div
                  key="naming"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-xl p-6 shadow-xl"
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Người chơi {currentPlayerView + 1}
                  </h2>
                  <div className="space-y-4">
                    <motion.div variants={cardVariants}>
                      <label className="block text-gray-900 font-medium mb-2 text-lg">
                        Nhập tên của bạn:
                      </label>
                      <input
                        type="text"
                        className={`${inputStyles} ${
                          isNameDuplicate(debouncedName, currentPlayerView)
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Tên của bạn"
                        value={inputName}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setInputName(newName);
                          const updatedPlayers = [...players];
                          updatedPlayers[currentPlayerView].name = newName;
                          setPlayers(updatedPlayers);
                        }}
                      />
                    </motion.div>

                    <motion.div
                      variants={cardVariants}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      {showWord ? (
                        <div className="text-center">
                          <p className="text-xl font-bold mb-2 text-gray-900">
                            Từ của bạn là:
                          </p>
                          <p className="text-3xl text-indigo-600 font-bold">
                            {players[currentPlayerView].word ||
                              "Bạn là Mr. White"}
                          </p>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const currentName = inputName.trim();
                            if (!currentName) {
                              toast.error(
                                "Vui lòng nhập tên trước khi xem từ!",
                                {
                                  duration: 2000,
                                  position: "top-center",
                                  style: {
                                    background: "#FF5555",
                                    color: "#fff",
                                  },
                                }
                              );
                              return;
                            }

                            if (
                              isNameDuplicate(currentName, currentPlayerView)
                            ) {
                              toast.error(
                                "Vui lòng chọn tên khác trước khi xem từ!",
                                {
                                  duration: 2000,
                                  position: "top-center",
                                  style: {
                                    background: "#FF5555",
                                    color: "#fff",
                                  },
                                }
                              );
                              return;
                            }

                            setShowWord(true);
                          }}
                          className={`w-full py-3 rounded-lg shadow-md text-lg font-medium ${
                            inputName.trim() &&
                            !isNameDuplicate(debouncedName, currentPlayerView)
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-gray-400 text-gray-200 cursor-not-allowed"
                          }`}
                          disabled={
                            !inputName.trim() ||
                            isNameDuplicate(debouncedName, currentPlayerView)
                          }
                        >
                          Xem từ của bạn
                        </motion.button>
                      )}
                    </motion.div>

                    <motion.button
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Tiếp tục
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {gameState === "playing" && (
                <motion.div
                  key="playing"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4 relative pb-16"
                >
                  <div className="bg-white rounded-xl p-4 shadow-xl mb-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">
                        Vòng chơi hiện tại
                      </h2>
                      <span className="px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full font-bold text-lg">
                        #{currentRound}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Số người còn sống:{" "}
                      <span className="font-bold text-indigo-600">
                        {players.filter((p) => p.isAlive).length}
                      </span>
                      /{players.length}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {players.map((player, index) => (
                      <motion.div
                        key={player.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-xl p-4 shadow-xl ${
                          !player.isAlive ? "opacity-75" : ""
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {player.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-base font-medium ${
                              player.isAlive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {player.isAlive ? "Đang chơi" : "Đã bị loại"}
                          </span>
                        </div>

                        {player.isAlive && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setPlayerToEliminate(player.id);
                              setShowConfirmModal(true);
                            }}
                            className="w-full py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <UserX size={20} />
                            <span>Loại</span>
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {canSkipVote && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSkipConfirmModal(true)}
                      className="fixed bottom-24 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
                      title="Bỏ qua lượt này"
                    >
                      <SkipForward size={24} />
                    </motion.button>
                  )}

                  {showConfirmModal && playerToEliminate !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl max-w-md w-full shadow-2xl p-6"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Xác nhận loại người chơi
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Bạn có chắc chắn muốn loại{" "}
                          <span className="font-bold text-gray-900">
                            {
                              players.find((p) => p.id === playerToEliminate)
                                ?.name
                            }
                          </span>
                          ?
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const updatedPlayers = [...players];
                              const playerToRemove = updatedPlayers.find(
                                (p) => p.id === playerToEliminate
                              );

                              if (!playerToRemove) {
                                toast.error(
                                  "Có lỗi xảy ra khi loại người chơi!"
                                );
                                setShowConfirmModal(false);
                                setPlayerToEliminate(null);
                                return;
                              }

                              if (playerToRemove.role === "mrwhite") {
                                setShowMrWhiteGuessModal(true);
                                setShowConfirmModal(false);
                              } else {
                                playerToRemove.isAlive = false;
                                setPlayers(updatedPlayers);
                                toast.success(
                                  `Đã loại ${playerToRemove.name}!`
                                );
                                if (playerToRemove.role === "civilian") {
                                  toast.error("Bạn đã loại nhầm dân thường!", {
                                    duration: 3000,
                                  });
                                } else if (
                                  playerToRemove.role === "undercover"
                                ) {
                                  toast.success(
                                    "Bạn đã loại đúng Undercover!",
                                    {
                                      duration: 3000,
                                    }
                                  );
                                }
                                setCurrentRound((prev) => prev + 1);
                                checkGameEnd(updatedPlayers);
                                setShowConfirmModal(false);
                                setPlayerToEliminate(null);
                              }
                            }}
                            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-medium flex items-center justify-center gap-2"
                          >
                            <Check size={20} />
                            <span>Xác nhận</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setShowConfirmModal(false);
                              setPlayerToEliminate(null);
                            }}
                            className="bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 font-medium flex items-center justify-center gap-2"
                          >
                            <X size={20} />
                            <span>Hủy</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showMrWhiteGuessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full shadow-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Bạn là Mr. White! Hãy đoán từ của dân thường
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={mrWhiteGuess}
                onChange={(e) => setMrWhiteGuess(e.target.value)}
                placeholder="Nhập từ bạn đoán..."
                className={inputStyles}
                autoFocus
              />
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMrWhiteGuess}
                  disabled={!mrWhiteGuess.trim()}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium"
                >
                  Đoán
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const updatedPlayers = [...players];
                    const eliminatedPlayer = updatedPlayers.find(
                      (p) => p.id === playerToEliminate
                    )!;
                    eliminatedPlayer.isAlive = false;
                    setPlayers(updatedPlayers);
                    setShowMrWhiteGuessModal(false);
                    setShowConfirmModal(false);
                    setPlayerToEliminate(null);
                    setMrWhiteGuess("");
                    toast.error("Mr.White đã bỏ qua cơ hội đoán từ!", {
                      duration: 3000,
                    });
                    checkGameEnd(updatedPlayers);
                  }}
                  className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 font-medium"
                >
                  Bỏ qua
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showResults && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 pb-24 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full shadow-2xl max-h-[80vh] flex flex-col"
          >
            <div className="p-6 border-b">
              <h2 className="text-3xl font-bold text-gray-900">
                Kết quả trò chơi
              </h2>
              <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Crown size={28} className="text-yellow-500" />
                  <span>
                    {winner === "civilian"
                      ? "Dân thường chiến thắng! 🎉"
                      : winner === "undercover"
                      ? "Undercover chiến thắng! 🕵️"
                      : "Mr. White chiến thắng! 🎭"}
                  </span>
                </p>
                <span className="px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full font-bold">
                  {currentRound} vòng
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {players.map((player) => (
                  <motion.div
                    key={player.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        {player.name}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          player.role === "civilian"
                            ? "bg-green-100 text-green-800"
                            : player.role === "undercover"
                            ? "bg-red-100 text-red-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {getRoleDisplay(player.role)}
                      </span>
                    </div>
                    <div className="text-gray-600 font-medium">
                      Từ của người chơi:{" "}
                      <span className="text-indigo-600 font-bold">
                        {player.role === "mrwhite"
                          ? "Không biết từ"
                          : player.word}
                      </span>
                    </div>
                    {!player.isAlive && (
                      <div className="mt-1 text-sm text-red-600 font-medium">
                        Đã bị loại
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setGameState("setup");
                  setShowResults(false);
                  setPlayers([]);
                  setPlayerCount(DEFAULT_PLAYERS);
                }}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 shadow-md font-medium text-lg"
              >
                Chơi lại
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showRules && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Luật chơi Under Cover
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowRules(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>

            <div className="space-y-6">
              {gameRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {rule.content}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowRules(false)}
              className="w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 shadow-md font-medium"
            >
              Đã hiểu
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {showSkipConfirmModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full shadow-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Xác nhận bỏ qua lượt
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn bỏ qua lượt vote này?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentRound((prev) => prev + 1);
                  toast.success("Đã bỏ qua lượt vote này!");
                  setShowSkipConfirmModal(false);
                }}
                className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-medium flex items-center justify-center gap-2"
              >
                <Check size={20} />
                <span>Xác nhận</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSkipConfirmModal(false)}
                className="bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 font-medium flex items-center justify-center gap-2"
              >
                <X size={20} />
                <span>Hủy</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Game;
