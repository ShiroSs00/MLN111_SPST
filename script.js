// GOVERN: Digital Society
// Vanilla JavaScript only. Story content is kept in the chapters array so it is easy to edit.

const initialStats = {
  economy: 50,
  stability: 50,
  trust: 50,
  inequality: 50,
  techPower: 50,
};

let stats = { ...initialStats };
let currentChapterIndex = 0;
let currentLineIndex = 0;
let hasChosen = false;
let statsIntroduced = false;
let isTyping = false;
let typingTimer = null;
let currentFullText = "";
let currentSpeaker = "";

const typingSpeed = 25;

const statMeta = {
  economy: { label: "Kinh tế", icon: "💰" },
  stability: { label: "Ổn định xã hội", icon: "🛡️" },
  trust: { label: "Niềm tin nhân dân", icon: "🤝" },
  inequality: { label: "Bất bình đẳng", icon: "⚖️" },
  techPower: { label: "Quyền lực công nghệ", icon: "🤖" },
};

const statDescriptions = {
  economy: "Tăng trưởng, ngân sách, đầu tư và khả năng vận hành kinh tế.",
  stability: "Trật tự, an toàn và khả năng kiểm soát xung đột xã hội.",
  trust: "Mức độ người dân tin tưởng vào nhà nước và chính sách.",
  inequality: "Khoảng cách giàu nghèo, chênh lệch cơ hội và phân hóa xã hội.",
  techPower: "Mức độ tập đoàn công nghệ kiểm soát dữ liệu, hạ tầng và dịch vụ.",
};

const speakerAvatars = {
  "Hệ thống": "assets/characters/system.png",
  Mira: "assets/characters/mira.png",
  Kaito: "assets/characters/kaito.png",
  Elias: "assets/characters/elias.png",
  Linh: "assets/characters/linh.png",
};

const speakerRoles = {
  "Hệ thống": "Tường thuật",
  Mira: "Cố vấn xã hội",
  Kaito: "Bộ trưởng Kinh tế số",
  Elias: "CEO OmniCore",
  Linh: "Công dân",
};

const finalConclusion =
  "AI, dữ liệu và tự động hóa làm lực lượng sản xuất phát triển rất nhanh, nhưng chúng không tự giải quyết được quan hệ sản xuất: ai sở hữu dữ liệu, ai kiểm soát nền tảng, ai hưởng lợi và ai bị bỏ lại. Công nghệ không thay thế nhà nước. Công nghệ chỉ thay đổi phương thức hoạt động của nhà nước. Khi xã hội còn mâu thuẫn lợi ích, bất bình đẳng và phân hóa giai cấp, nhà nước vẫn cần thiết để điều chỉnh quan hệ sản xuất, tổ chức kinh tế, quản lý xã hội, bảo vệ an ninh và điều hòa lợi ích.";

const chapters = [
  {
    title: "Chương 1: Ngày nhậm chức",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Phủ Điều phối Quốc gia Novaterra]",
      },
      {
        speaker: "Hệ thống",
        text: "Hôm nay là ngày bạn nhậm chức lãnh đạo Novaterra.",
      },
      {
        speaker: "Hệ thống",
        text: "Bên ngoài quảng trường, màn hình khổng lồ chiếu hình ảnh một quốc gia hiện đại: xe tự lái, bệnh viện AI, trường học số và dịch vụ công trực tuyến.",
      },
      {
        speaker: "Hệ thống",
        text: "Nhưng phía dưới ánh đèn công nghệ là nhiều cuộc biểu tình nhỏ.",
      },
      {
        speaker: "Hệ thống",
        text: "Một nhóm người giơ biểu ngữ: “AI không thể thay thế trách nhiệm của nhà nước.”",
      },
      {
        speaker: "Hệ thống",
        text: "Một nhóm khác hô vang: “Hãy để thuật toán điều hành xã hội.”",
      },
      {
        speaker: "Hệ thống",
        text: "Trong phòng họp, các cố vấn đang chờ quyết định đầu tiên của bạn.",
      },
      {
        speaker: "Kaito",
        text: "Thưa ngài, Novaterra đang tăng trưởng nhanh nhờ công nghệ.",
      },
      {
        speaker: "Kaito",
        text: "Nhưng người dân bắt đầu đặt câu hỏi liệu nhà nước có còn cần thiết hay không.",
      },
      {
        speaker: "Mira",
        text: "Câu hỏi đó không thể trả lời chỉ bằng tốc độ xử lý của AI.",
      },
      {
        speaker: "Mira",
        text: "AI, robot và dữ liệu đang làm lực lượng sản xuất phát triển rất nhanh.",
      },
      {
        speaker: "Mira",
        text: "Nhưng nếu quan hệ sở hữu, phân phối và kiểm soát xã hội không thay đổi phù hợp, mâu thuẫn sẽ ngày càng gay gắt.",
      },
      {
        speaker: "Mira",
        text: "Xã hội có nhiều nhóm lợi ích khác nhau. Nếu không có thiết chế điều tiết, mâu thuẫn sẽ bùng nổ.",
      },
      {
        speaker: "Elias",
        text: "OmniCore đã chứng minh rằng thuật toán có thể phân tích dữ liệu xã hội nhanh hơn bất kỳ bộ máy hành chính nào.",
      },
      {
        speaker: "Elias",
        text: "Nhà nước nên lùi lại.",
      },
      {
        speaker: "Linh",
        text: "Tôi không cần hệ thống hoàn hảo.",
      },
      {
        speaker: "Linh",
        text: "Tôi cần biết ai chịu trách nhiệm khi quyết định sai.",
      },
      {
        speaker: "Hệ thống",
        text: "Bạn phải đưa ra thông điệp đầu tiên trước toàn quốc.",
      },
    ],
    lesson:
      "Bài học biện chứng: lực lượng sản xuất mới như AI, dữ liệu và tự động hóa có thể thúc đẩy phát triển, nhưng chúng cũng đặt ra yêu cầu điều chỉnh quan hệ sản xuất. Nhà nước tồn tại vì xã hội có nhiều nhóm lợi ích và mâu thuẫn cần được điều hòa bằng một thiết chế quyền lực công cộng. AI có thể hỗ trợ phân tích, nhưng không tự đại diện cho lợi ích chung.",
    choices: [
      {
        text: "Để AI và thị trường tự điều phối xã hội.",
        detail: "Lực lượng sản xuất tăng nhanh nhưng quan hệ sở hữu và phân phối không được điều chỉnh.",
        effects: { economy: 15, techPower: 20, trust: -10, inequality: 10 },
        consequence:
          "Kinh tế số tăng nhanh và OmniCore được thị trường ủng hộ. Tuy nhiên, nhiều nhóm yếu thế lo rằng quyền lợi của họ sẽ bị quyết định bởi thuật toán không chịu trách nhiệm chính trị.",
      },
      {
        text: "Dùng AI để đổi mới nhà nước nhưng giữ quyền điều phối công.",
        detail: "Phát triển lực lượng sản xuất đồng thời điều chỉnh quan hệ sản xuất bằng luật và trách nhiệm công.",
        effects: { economy: 5, stability: 10, trust: 15, techPower: -5 },
        consequence:
          "Người dân yên tâm hơn vì nhà nước không phủ nhận công nghệ, nhưng cũng không giao toàn bộ quyền lực xã hội cho tập đoàn tư nhân.",
      },
      {
        text: "Hạn chế mạnh công nghệ để bảo vệ vai trò truyền thống của nhà nước.",
        detail: "Giữ quan hệ quản lý cũ nhưng làm chậm sự phát triển của lực lượng sản xuất.",
        effects: { economy: -15, stability: 5, techPower: -10, trust: 5 },
        consequence:
          "Một bộ phận người dân thấy nhà nước cứng rắn hơn, nhưng nhiều dự án đổi mới bị đình lại. Doanh nghiệp bắt đầu cân nhắc rời Novaterra.",
      },
    ],
  },
  {
    title: "Chương 2: AI thay thế lao động",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Khu công nghiệp Đông Novaterra]",
      },
      {
        speaker: "Hệ thống",
        text: "Ba tháng sau ngày nhậm chức, một khủng hoảng mới xảy ra.",
      },
      {
        speaker: "Hệ thống",
        text: "OmniCore triển khai hệ thống robot sản xuất tự động cho hàng trăm nhà máy.",
      },
      {
        speaker: "Hệ thống",
        text: "Năng suất tăng mạnh, chi phí giảm, hàng hóa rẻ hơn.",
      },
      {
        speaker: "Hệ thống",
        text: "Nhưng 300.000 lao động bị sa thải trong một tháng.",
      },
      {
        speaker: "Hệ thống",
        text: "Trên đường phố, công nhân biểu tình: “Chúng tôi không chống công nghệ. Chúng tôi cần được sống.”",
      },
      {
        speaker: "Kaito",
        text: "Thưa ngài, nếu cản doanh nghiệp dùng AI, Novaterra sẽ mất lợi thế cạnh tranh.",
      },
      {
        speaker: "Mira",
        text: "Nếu bỏ mặc người lao động, tăng trưởng sẽ chỉ phục vụ cho một nhóm sở hữu công nghệ.",
      },
      {
        speaker: "Mira",
        text: "Khi lực lượng sản xuất thay đổi, quan hệ lao động và phân phối thu nhập cũng phải được điều chỉnh.",
      },
      {
        speaker: "Elias",
        text: "Lịch sử luôn có người bị thay thế. Đó là giá của tiến bộ.",
      },
      {
        speaker: "Linh",
        text: "Anh trai tôi làm trong nhà máy đó.",
      },
      {
        speaker: "Linh",
        text: "Anh ấy không cần khẩu hiệu. Anh ấy cần việc làm mới.",
      },
      {
        speaker: "Hệ thống",
        text: "Bạn phải chọn chính sách.",
      },
    ],
    lesson:
      "AI và robot là bước phát triển mới của lực lượng sản xuất. Nhưng nếu quan hệ sản xuất vẫn để toàn bộ lợi ích rơi vào nhóm sở hữu công nghệ, người lao động sẽ bị đẩy ra khỏi quá trình phát triển. Nhà nước cần điều tiết quan hệ lao động, đào tạo lại và phân phối chi phí chuyển đổi để tự động hóa không biến thành khủng hoảng xã hội.",
    choices: [
      {
        text: "Để thị trường tự điều chỉnh, không can thiệp.",
        detail: "Để chủ sở hữu công nghệ tự quyết quan hệ lao động và phân phối lợi ích.",
        effects: { economy: 20, techPower: 15, inequality: 20, trust: -20, stability: -15 },
        consequence:
          "Doanh nghiệp tăng lợi nhuận và tiếp tục đầu tư. Nhưng thất nghiệp lan rộng, biểu tình tăng lên và nhiều lao động cảm thấy nhà nước bỏ rơi họ.",
      },
      {
        text: "Lập quỹ hỗ trợ thất nghiệp và đào tạo lại lao động.",
        detail: "Điều chỉnh quan hệ lao động để người lao động thích nghi với lực lượng sản xuất mới.",
        effects: { economy: -5, stability: 20, trust: 20, inequality: -15 },
        consequence:
          "Ngân sách chịu áp lực nhưng nhiều lao động được học kỹ năng mới. Xung đột xã hội giảm vì người dân thấy nhà nước đứng ra điều hòa lợi ích.",
      },
      {
        text: "Cấm thay thế lao động bằng AI trên diện rộng.",
        detail: "Bảo vệ quan hệ lao động cũ nhưng có nguy cơ kìm hãm lực lượng sản xuất.",
        effects: { economy: -20, stability: 10, techPower: -10, trust: 5 },
        consequence:
          "Việc làm cũ được giữ tạm thời, nhưng đầu tư giảm mạnh. Một số công ty chuyển nhà máy ra nước ngoài.",
      },
    ],
  },
  {
    title: "Chương 3: Dữ liệu của ai?",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Trung tâm dữ liệu OmniCore]",
      },
      {
        speaker: "Hệ thống",
        text: "Một cuộc điều tra độc lập phát hiện OmniCore đã thu thập và bán dữ liệu cá nhân của hàng chục triệu công dân.",
      },
      {
        speaker: "Hệ thống",
        text: "Dữ liệu bao gồm lịch sử bệnh án, kết quả học tập, hành vi mua sắm, vị trí di chuyển và điểm tín dụng.",
      },
      {
        speaker: "Hệ thống",
        text: "Nhiều công dân bị thuật toán đánh giá mà không hề biết tiêu chí phía sau.",
      },
      {
        speaker: "Linh",
        text: "Ngân hàng từ chối khoản vay của tôi vì thuật toán cho rằng tôi là “nguy cơ tài chính cao”.",
      },
      {
        speaker: "Linh",
        text: "Tôi chưa từng cho phép họ dùng dữ liệu đó.",
      },
      {
        speaker: "Linh",
        text: "Tôi cũng không biết thuật toán đánh giá tôi như thế nào.",
      },
      {
        speaker: "Elias",
        text: "Dữ liệu giúp xã hội vận hành hiệu quả hơn. Cá nhân không nên cản trở lợi ích tổng thể.",
      },
      {
        speaker: "Mira",
        text: "Nếu dữ liệu người dân trở thành hàng hóa không kiểm soát, người yếu thế sẽ bị tổn thương trước tiên.",
      },
      {
        speaker: "Mira",
        text: "Dữ liệu giờ không chỉ là thông tin cá nhân. Nó đã trở thành tư liệu sản xuất quan trọng trong nền kinh tế số.",
      },
      {
        speaker: "Kaito",
        text: "Nhưng nếu xử phạt quá mạnh, nhà đầu tư công nghệ sẽ lo sợ.",
      },
      {
        speaker: "Hệ thống",
        text: "Bạn phải quyết định cách xử lý.",
      },
    ],
    lesson:
      "Dữ liệu là tư liệu sản xuất mới của thời đại số. Vấn đề biện chứng nằm ở quan hệ sản xuất: dữ liệu thuộc về ai, ai được khai thác, ai chịu rủi ro và ai kiểm soát thuật toán. Nhà nước hiện đại phải quản lý bằng pháp luật, bảo vệ quyền công dân và buộc các chủ thể công nghệ chịu trách nhiệm.",
    choices: [
      {
        text: "Phạt OmniCore và ban hành Luật Bảo vệ dữ liệu cá nhân.",
        detail: "Đặt dữ liệu công dân dưới pháp luật và cơ chế giám sát.",
        effects: { trust: 25, stability: 10, techPower: -20, economy: -5 },
        consequence:
          "Người dân ủng hộ vì thấy quyền riêng tư được bảo vệ. OmniCore phản đối và cảnh báo rằng đổi mới có thể chậm lại.",
      },
      {
        text: "Bỏ qua vụ việc để giữ môi trường đầu tư công nghệ.",
        detail: "Ưu tiên lợi ích doanh nghiệp và tăng trưởng ngắn hạn.",
        effects: { economy: 10, techPower: 20, trust: -25, inequality: 10 },
        consequence:
          "Thị trường công nghệ ổn định trước mắt, nhưng người dân cảm thấy quyền riêng tư bị hy sinh cho lợi nhuận.",
      },
      {
        text: "Nhà nước thu toàn bộ dữ liệu về một hệ thống tập trung.",
        detail: "Giảm quyền lực OmniCore nhưng tăng quyền kiểm soát của bộ máy công.",
        effects: { techPower: -20, stability: 5, trust: -10, inequality: -5 },
        consequence:
          "OmniCore mất quyền kiểm soát dữ liệu, nhưng một bộ phận người dân lo ngại nhà nước có thể lạm dụng nếu thiếu minh bạch.",
      },
    ],
  },
  {
    title: "Chương 4: Thành phố bất bình đẳng",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Thành phố Novaterra]",
      },
      {
        speaker: "Hệ thống",
        text: "Khu trung tâm rực sáng với xe tự lái, trường học AI, bệnh viện robot và căn hộ thông minh.",
      },
      {
        speaker: "Hệ thống",
        text: "Nhưng chỉ cách đó 20km, vùng ngoại ô vẫn thiếu mạng ổn định.",
      },
      {
        speaker: "Hệ thống",
        text: "Trường học xuống cấp, bệnh viện quá tải, còn người dân phải chờ nhiều giờ để làm thủ tục cơ bản.",
      },
      {
        speaker: "Hệ thống",
        text: "Một báo cáo cho thấy 10% dân số giàu nhất sở hữu phần lớn cổ phần trong các công ty AI.",
      },
      {
        speaker: "Hệ thống",
        text: "Trong khi đó, phần lớn người lao động chỉ nhận việc tạm thời với thu nhập thấp.",
      },
      {
        speaker: "Hệ thống",
        text: "Người dân biểu tình: “Công nghệ cho ai?” “Tương lai thuộc về ai?”",
      },
      {
        speaker: "Mira",
        text: "Nếu nhà nước không điều tiết, xã hội sẽ bị chia thành hai thế giới.",
      },
      {
        speaker: "Mira",
        text: "Một bên nắm dữ liệu, vốn và nền tảng; bên còn lại chỉ có sức lao động bị thay thế dần.",
      },
      {
        speaker: "Kaito",
        text: "Đánh thuế quá cao vào doanh nghiệp công nghệ có thể làm giảm tăng trưởng.",
      },
      {
        speaker: "Elias",
        text: "Bất bình đẳng là kết quả tự nhiên của cạnh tranh. Người thích nghi tốt hơn sẽ thắng.",
      },
      {
        speaker: "Linh",
        text: "Con tôi không thua vì lười học.",
      },
      {
        speaker: "Linh",
        text: "Nó thua vì không có điều kiện tiếp cận công nghệ.",
      },
      {
        speaker: "Hệ thống",
        text: "Bạn cần chọn chính sách phân phối nguồn lực.",
      },
    ],
    lesson:
      "Khi lực lượng sản xuất số phát triển không đều, quan hệ phân phối cũng trở nên căng thẳng hơn. Nếu lợi ích công nghệ chỉ tập trung vào nhóm sở hữu vốn, dữ liệu và nền tảng, mâu thuẫn xã hội sẽ sâu sắc. Nhà nước phải tổ chức kinh tế và phân phối lại nguồn lực để quan hệ sản xuất không kìm hãm sự phát triển chung.",
    choices: [
      {
        text: "Đánh thuế nền tảng số để đầu tư giáo dục, y tế và hạ tầng vùng yếu thế.",
        detail: "Tái phân phối lợi ích công nghệ sang dịch vụ công.",
        effects: { inequality: -25, trust: 20, stability: 15, economy: -5 },
        consequence:
          "Nguồn lực công được đưa vào trường học, bệnh viện và hạ tầng mạng. Doanh nghiệp không hài lòng, nhưng khoảng cách xã hội giảm.",
      },
      {
        text: "Tiếp tục ưu đãi doanh nghiệp công nghệ để giữ tăng trưởng cao.",
        detail: "Tăng GDP trước, xử lý bất bình đẳng sau.",
        effects: { economy: 20, techPower: 15, inequality: 25, stability: -10 },
        consequence:
          "GDP tăng nhanh, nhưng vùng ngoại ô càng tụt lại. Người dân bắt đầu nghi ngờ rằng nhà nước chỉ bảo vệ nhóm giàu công nghệ.",
      },
      {
        text: "Phát trợ cấp ngắn hạn cho người nghèo.",
        detail: "Làm dịu căng thẳng trước mắt nhưng chưa sửa nguyên nhân cấu trúc.",
        effects: { trust: 10, stability: 5, inequality: -5, economy: -10 },
        consequence:
          "Đời sống trước mắt bớt khó khăn, nhưng thiếu đầu tư dài hạn nên khoảng cách số vẫn còn.",
      },
    ],
  },
  {
    title: "Chương 5: Y tế số và nhóm yếu thế",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Bệnh viện Trung tâm Novaterra]",
      },
      {
        speaker: "Hệ thống",
        text: "Novaterra triển khai hệ thống AI y tế để phân loại bệnh nhân và ưu tiên điều trị.",
      },
      {
        speaker: "Hệ thống",
        text: "Hệ thống hoạt động rất nhanh.",
      },
      {
        speaker: "Hệ thống",
        text: "Nhưng nó lại ưu tiên người có bảo hiểm tốt, dữ liệu đầy đủ và hồ sơ tài chính ổn định.",
      },
      {
        speaker: "Linh",
        text: "Mẹ tôi bị xếp lịch khám sau nhiều tuần chỉ vì hồ sơ dữ liệu thiếu.",
      },
      {
        speaker: "Linh",
        text: "Người nghèo không có dữ liệu đẹp thì có bị xem là ít giá trị hơn không?",
      },
      {
        speaker: "Kaito",
        text: "AI giúp giảm chi phí y tế. Nếu can thiệp quá nhiều, hiệu quả hệ thống sẽ giảm.",
      },
      {
        speaker: "Mira",
        text: "Y tế là dịch vụ thiết yếu.",
      },
      {
        speaker: "Mira",
        text: "Nhà nước không thể để quyền được chữa bệnh phụ thuộc hoàn toàn vào khả năng chi trả và dữ liệu thương mại.",
      },
      {
        speaker: "Mira",
        text: "Nếu quan hệ tiếp cận dịch vụ công chỉ dựa trên dữ liệu và bảo hiểm, AI sẽ làm bất bình đẳng cũ trở nên sắc nét hơn.",
      },
      {
        speaker: "Elias",
        text: "OmniCore chỉ tối ưu hệ thống theo dữ liệu.",
      },
      {
        speaker: "Elias",
        text: "Thuật toán không có cảm xúc, cũng không có thiên vị chính trị.",
      },
      {
        speaker: "Hệ thống",
        text: "Bạn phải quyết định cách nhà nước can thiệp vào y tế số.",
      },
    ],
    lesson:
      "AI y tế làm lực lượng sản xuất trong lĩnh vực chăm sóc sức khỏe tiến bộ hơn. Nhưng quan hệ sản xuất trong y tế gồm quyền tiếp cận, cách phân bổ dịch vụ và trách nhiệm với nhóm yếu thế. Nhà nước phải bảo đảm phúc lợi công để công nghệ tăng hiệu quả mà không tái sản xuất bất bình đẳng có sẵn.",
    choices: [
      {
        text: "Quy định AI y tế phải ưu tiên nhu cầu điều trị và nhóm yếu thế.",
        detail: "Đặt phúc lợi công cao hơn lợi nhuận dữ liệu.",
        effects: { trust: 20, stability: 15, inequality: -20, economy: -5, techPower: -10 },
        consequence:
          "Người nghèo và nhóm yếu thế được tiếp cận y tế tốt hơn. OmniCore phải chỉnh lại thuật toán và chịu giám sát công khai.",
      },
      {
        text: "Giữ mô hình tối ưu theo bảo hiểm và dữ liệu để tiết kiệm chi phí.",
        detail: "Ưu tiên hiệu quả vận hành và chi phí thấp.",
        effects: { economy: 15, techPower: 15, inequality: 20, trust: -15, stability: -10 },
        consequence:
          "Hệ thống y tế chạy nhanh hơn cho nhóm có dữ liệu tốt, nhưng người nghèo bị đẩy ra rìa và phản ứng xã hội tăng.",
      },
      {
        text: "Tạm dừng toàn bộ AI y tế và quay lại quy trình thủ công.",
        detail: "Loại bỏ rủi ro thuật toán nhưng làm dịch vụ chậm hơn.",
        effects: { techPower: -15, trust: 5, economy: -15, stability: -5 },
        consequence:
          "Người dân thấy nhà nước phản ứng nhanh, nhưng bệnh viện quá tải trở lại. Công nghệ bị loại bỏ thay vì được điều chỉnh.",
      },
    ],
  },
  {
    title: "Chương 6: Tin giả và khủng hoảng niềm tin",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Quảng trường trước Phủ Điều phối]",
      },
      {
        speaker: "Hệ thống",
        text: "Một chiến dịch tin giả lan rộng trên mạng.",
      },
      {
        speaker: "Hệ thống",
        text: "Chính phủ bị cáo buộc bán dữ liệu công dân cho OmniCore.",
      },
      {
        speaker: "Hệ thống",
        text: "Đám đông tụ tập trước Phủ Điều phối.",
      },
      {
        speaker: "Hệ thống",
        text: "Một số nhóm kêu gọi lật đổ chính quyền, trong khi bot tự động khuếch đại tin đồn.",
      },
      {
        speaker: "Mira",
        text: "Nếu chỉ trấn áp, người dân sẽ càng nghĩ nhà nước che giấu sự thật.",
      },
      {
        speaker: "Mira",
        text: "Khi nền tảng số kiểm soát thông tin, quan hệ giữa nhà nước, công dân và doanh nghiệp công nghệ cũng thay đổi.",
      },
      {
        speaker: "Kaito",
        text: "Cần phản ứng nhanh. Thị trường đang hoảng loạn vì bất ổn xã hội.",
      },
      {
        speaker: "Elias",
        text: "OmniCore có thể lọc nội dung độc hại ngay lập tức.",
      },
      {
        speaker: "Elias",
        text: "Chỉ cần chính phủ cho chúng tôi toàn quyền xử lý luồng thông tin.",
      },
      {
        speaker: "Linh",
        text: "Tôi muốn biết sự thật, không phải chỉ nghe mệnh lệnh im lặng.",
      },
      {
        speaker: "Hệ thống",
        text: "Bạn phải chọn cách phản ứng trước khủng hoảng niềm tin.",
      },
    ],
    lesson:
      "Nền tảng truyền thông số là một bộ phận của lực lượng sản xuất tinh thần và thông tin. Nếu quan hệ kiểm soát thông tin nằm hoàn toàn trong tay tập đoàn hoặc bị nhà nước dùng thiếu minh bạch, niềm tin xã hội sẽ khủng hoảng. Nhà nước duy trì ổn định không chỉ bằng cưỡng chế mà bằng minh bạch, trách nhiệm và tính chính danh.",
    choices: [
      {
        text: "Công khai dữ liệu kiểm toán, họp báo minh bạch và xử lý tài khoản giả theo luật.",
        detail: "Kết hợp minh bạch, trách nhiệm và pháp luật.",
        effects: { trust: 25, stability: 20, economy: -5, techPower: -5 },
        consequence:
          "Tin giả giảm dần vì chính phủ đưa ra bằng chứng và chịu chất vấn công khai. Niềm tin phục hồi, dù phản ứng chậm hơn việc kiểm duyệt hàng loạt.",
      },
      {
        text: "Trao OmniCore quyền tự động xóa nội dung và khóa tài khoản.",
        detail: "Ưu tiên tốc độ kiểm soát thông tin.",
        effects: { stability: 10, techPower: 25, trust: -20 },
        consequence:
          "Tin giả giảm nhanh, nhưng nhiều tài khoản thật cũng bị khóa. Người dân lo rằng quyền kiểm soát dư luận đang chuyển sang tập đoàn công nghệ.",
      },
      {
        text: "Dùng lực lượng an ninh giải tán biểu tình và cấm thảo luận trực tuyến.",
        detail: "Dập bất ổn bằng cưỡng chế trực tiếp.",
        effects: { stability: -15, trust: -25, economy: -10 },
        consequence:
          "Đám đông tan trong ngắn hạn, nhưng sự phẫn nộ tăng. Tin giả chuyển sang các kênh kín và trở nên khó kiểm soát hơn.",
      },
    ],
  },
  {
    title: "Chương 7: An ninh mạng quốc gia",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Trung tâm Điều hành An ninh mạng Novaterra]",
      },
      {
        speaker: "Hệ thống",
        text: "Một cuộc tấn công mạng từ nước ngoài đánh vào lưới điện, hệ thống giao thông và kho dữ liệu công dân.",
      },
      {
        speaker: "Hệ thống",
        text: "Nhiều bệnh viện phải chuyển sang vận hành thủ công.",
      },
      {
        speaker: "Hệ thống",
        text: "Người dân xếp hàng dài vì dịch vụ công trực tuyến ngừng hoạt động.",
      },
      {
        speaker: "Kaito",
        text: "Hạ tầng số là nền móng của kinh tế. Nếu không khôi phục nhanh, thiệt hại sẽ rất lớn.",
      },
      {
        speaker: "Mira",
        text: "An ninh mạng không chỉ là vấn đề kỹ thuật.",
      },
      {
        speaker: "Mira",
        text: "Nó liên quan đến chủ quyền, an toàn xã hội và quyền lợi của công dân.",
      },
      {
        speaker: "Mira",
        text: "Hạ tầng số là điều kiện vật chất mới của sản xuất và đời sống. Nếu mất quyền kiểm soát nó, nhà nước mất năng lực tổ chức xã hội.",
      },
      {
        speaker: "Elias",
        text: "OmniCore có đội phản ứng nhanh tốt nhất. Hãy giao toàn bộ hạ tầng cho chúng tôi bảo vệ.",
      },
      {
        speaker: "Linh",
        text: "Tôi cần điện, bệnh viện và dữ liệu của mình được bảo vệ.",
      },
      {
        speaker: "Linh",
        text: "Nhưng tôi cũng muốn biết ai kiểm soát hệ thống đó.",
      },
      {
        speaker: "Hệ thống",
        text: "Bạn phải quyết định cách bảo vệ hạ tầng số quốc gia.",
      },
    ],
    lesson:
      "Hạ tầng mạng, dữ liệu và hệ thống điện toán là điều kiện vật chất của lực lượng sản xuất hiện đại. Quan hệ sản xuất ở đây là quyền kiểm soát hạ tầng chiến lược thuộc về ai và phục vụ lợi ích nào. Nhà nước phải bảo vệ chủ quyền số, an ninh công cộng và điều kiện vận hành của toàn xã hội.",
    choices: [
      {
        text: "Xây dựng trung tâm an ninh mạng quốc gia và hợp tác có kiểm soát với doanh nghiệp.",
        detail: "Giữ chủ quyền công nhưng tận dụng năng lực kỹ thuật.",
        effects: { stability: 20, trust: 15, economy: -5, techPower: -5 },
        consequence:
          "Hệ thống được khôi phục từng bước. Nhà nước giữ quyền chỉ huy, còn chuyên gia tư nhân hỗ trợ trong khuôn khổ pháp luật.",
      },
      {
        text: "Giao OmniCore toàn quyền bảo vệ hạ tầng số.",
        detail: "Khôi phục nhanh bằng năng lực tập đoàn.",
        effects: { stability: 10, economy: 10, techPower: 25, trust: -15 },
        consequence:
          "Dịch vụ được khôi phục nhanh, nhưng quyền kiểm soát hạ tầng chiến lược chuyển mạnh sang OmniCore.",
      },
      {
        text: "Ngắt kết nối nhiều hệ thống số và quay về vận hành thủ công.",
        detail: "Giảm rủi ro mạng nhưng làm xã hội chậm lại.",
        effects: { techPower: -20, economy: -20, stability: -5, trust: 5 },
        consequence:
          "Một số rủi ro được chặn lại, nhưng dịch vụ công đình trệ. Người dân thấy rõ rằng phủ nhận công nghệ không phải giải pháp dài hạn.",
      },
    ],
  },
  {
    title: "Chương 8: AUTO-STATE",
    lines: [
      {
        speaker: "Hệ thống",
        text: "[Quốc hội Novaterra]",
      },
      {
        speaker: "Hệ thống",
        text: "Sau nhiều khủng hoảng, Elias xuất hiện trước Quốc hội Novaterra với đề xuất AUTO-STATE.",
      },
      {
        speaker: "Elias",
        text: "AUTO-STATE sẽ để AI vận hành toàn bộ dịch vụ công.",
      },
      {
        speaker: "Elias",
        text: "Ngân sách, y tế, an ninh, giáo dục và chính sách xã hội đều có thể được tự động hóa.",
      },
      {
        speaker: "Elias",
        text: "Không thiên vị, không chậm trễ.",
      },
      {
        speaker: "Kaito",
        text: "Hệ thống này có thể giảm chi phí rất lớn.",
      },
      {
        speaker: "Kaito",
        text: "Nhưng nếu giao toàn bộ quyền vận hành, nhà nước sẽ phụ thuộc vào hạ tầng tư nhân.",
      },
      {
        speaker: "Mira",
        text: "AI không tự xác định được lợi ích chung.",
      },
      {
        speaker: "Mira",
        text: "Nó tối ưu theo mục tiêu do người sở hữu và thiết kế đặt ra.",
      },
      {
        speaker: "Mira",
        text: "Nếu quan hệ sở hữu và kiểm soát nằm trong tay OmniCore, AI sẽ phục vụ mục tiêu của OmniCore trước khi phục vụ lợi ích chung.",
      },
      {
        speaker: "Linh",
        text: "Nếu AUTO-STATE từ chối trợ cấp, từ chối điều trị hoặc xếp tôi vào nhóm rủi ro thì sao?",
      },
      {
        speaker: "Linh",
        text: "Tôi sẽ khiếu nại với ai?",
      },
      {
        speaker: "Hệ thống",
        text: "Quyết định cuối cùng của nhiệm kỳ sẽ xác định tương lai Novaterra.",
      },
      {
        speaker: "Hệ thống",
        text: "Đó sẽ là nhà nước số vì nhân dân hay một xã hội do tập đoàn công nghệ điều hành?",
      },
    ],
    lesson:
      "AUTO-STATE đặt câu hỏi trung tâm của game: lực lượng sản xuất đã phát triển đến mức AI có thể hỗ trợ quản lý xã hội, nhưng quan hệ sản xuất vẫn quyết định công nghệ phục vụ ai. AI là công cụ, không phải thiết chế chính trị chịu trách nhiệm trước xã hội. Nhà nước vẫn cần thiết để điều chỉnh sở hữu, phân phối, kiểm soát và trách nhiệm trong xã hội có giai cấp.",
    choices: [
      {
        text: "Chấp nhận AUTO-STATE và giao OmniCore vận hành dịch vụ công.",
        detail: "Đặt hiệu quả kỹ thuật lên trên quyền lực công cộng.",
        effects: { economy: 15, techPower: 35, trust: -20, inequality: 10 },
        consequence:
          "Dịch vụ công tự động hóa nhanh chóng, nhưng quyền lực thực tế chuyển sang OmniCore. Người dân không còn rõ ai chịu trách nhiệm chính trị.",
      },
      {
        text: "Dùng AI như công cụ của nhà nước, có luật, kiểm toán và giám sát xã hội.",
        detail: "Hiện đại hóa nhà nước nhưng giữ trách nhiệm công.",
        effects: { economy: 10, stability: 15, trust: 20, inequality: -10, techPower: -10 },
        consequence:
          "Novaterra xây dựng nhà nước số: AI hỗ trợ phân tích và phục vụ người dân, còn quyết định chính sách vẫn thuộc về thiết chế chịu trách nhiệm trước xã hội.",
      },
      {
        text: "Bác bỏ toàn bộ AI trong dịch vụ công.",
        detail: "Bảo vệ nhà nước bằng cách loại bỏ công nghệ.",
        effects: { economy: -25, techPower: -20, stability: -5, trust: 5 },
        consequence:
          "Nhà nước giữ quyền kiểm soát trực tiếp, nhưng dịch vụ công chậm và tốn kém. Người dân mất cơ hội hưởng lợi từ công nghệ được quản lý đúng cách.",
      },
    ],
  },
];

const endings = {
  tech: {
    title: "Nhà nước bị thay thế bởi tập đoàn công nghệ",
    story:
      "OmniCore trở thành trung tâm điều hành thực tế của Novaterra. Dịch vụ công nhanh hơn, nhưng dữ liệu, hạ tầng và quyết định xã hội phụ thuộc vào một tập đoàn tư nhân.",
    conclusion:
      "Khi nhà nước từ bỏ chức năng điều tiết, quyền lực không biến mất. Nó chỉ chuyển sang tay lực lượng khác.",
  },
  trust: {
    title: "Khủng hoảng niềm tin",
    story:
      "Người dân không còn tin vào nhà nước. Mọi chính sách, kể cả chính sách đúng, đều bị nghi ngờ. Tin giả và xung đột lợi ích làm xã hội mất phương hướng.",
    conclusion:
      "Nhà nước không thể chỉ tồn tại bằng bộ máy cưỡng chế. Nhà nước cần tính chính danh, minh bạch và trách nhiệm xã hội.",
  },
  inequality: {
    title: "Xã hội phân hóa",
    story:
      "Novaterra trở thành xã hội hai tầng: một nhóm nhỏ sở hữu dữ liệu, vốn và AI; phần còn lại sống trong việc làm bấp bênh và dịch vụ yếu kém.",
    conclusion:
      "Nếu nhà nước không điều tiết phân phối lợi ích, công nghệ và thị trường có thể làm mâu thuẫn xã hội gay gắt hơn.",
  },
  economy: {
    title: "Kinh tế trì trệ",
    story:
      "Vì quá sợ công nghệ, Novaterra đánh mất động lực đổi mới. Doanh nghiệp rời đi, dịch vụ công chậm lại và người dân không được hưởng lợi từ tiến bộ kỹ thuật.",
    conclusion:
      "Nhà nước cần quản lý công nghệ, không phải phủ nhận công nghệ. Vấn đề là định hướng công nghệ phục vụ lợi ích xã hội.",
  },
  stability: {
    title: "Khủng hoảng an ninh xã hội",
    story:
      "Thất nghiệp, tin giả, tấn công mạng và bất bình đẳng khiến Novaterra rơi vào bất ổn. Nhà nước không còn đủ năng lực điều hòa mâu thuẫn.",
    conclusion:
      "Nhà nước có vai trò duy trì trật tự, bảo vệ an ninh và điều hòa mâu thuẫn xã hội. Khi chức năng này suy yếu, xã hội dễ rơi vào khủng hoảng.",
  },
  good: {
    title: "Nhà nước số vì nhân dân",
    story:
      "Novaterra bước vào thời đại số nhưng không đánh mất vai trò của nhà nước. AI được dùng để hỗ trợ dịch vụ công, phân tích dữ liệu và nâng cao hiệu quả quản lý.",
    conclusion:
      "Các quyết định quan trọng vẫn được đặt dưới pháp luật, trách nhiệm chính trị và sự giám sát của xã hội.",
  },
};

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endingScreen = document.getElementById("ending-screen");
const mainLayout = document.getElementById("main-layout");
const dialoguePanel = document.getElementById("dialogue-panel");
const dialogueNextBtn = document.getElementById("dialogue-next-btn");
const statsGrid = document.getElementById("stats-grid");
const statTutorial = document.getElementById("stat-tutorial");
const choicesEl = document.getElementById("choices");
const resultPanel = document.getElementById("result-panel");
const nextChapterBtn = document.getElementById("next-chapter-btn");
const changeList = document.getElementById("change-list");
const avatarImg = document.getElementById("character-avatar");
const avatarPlaceholder = document.getElementById("avatar-placeholder");

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", restartGame);
document.getElementById("understand-stats-btn").addEventListener("click", finishStatTutorial);
dialogueNextBtn.addEventListener("click", nextLine);
nextChapterBtn.addEventListener("click", nextChapter);
dialoguePanel.addEventListener("click", handleDialogueBoxClick);
document.getElementById("chapter-total").innerText = chapters.length;

function startGame() {
  stats = { ...initialStats };
  currentChapterIndex = 0;
  statsIntroduced = false;
  updateStats();
  statsGrid.classList.add("hidden");
  statTutorial.classList.add("hidden");
  showScreen(gameScreen);
  loadChapter();
}

function restartGame() {
  clearTimeout(typingTimer);
  typingTimer = null;
  isTyping = false;
  stats = { ...initialStats };
  currentChapterIndex = 0;
  currentLineIndex = 0;
  hasChosen = false;
  statsIntroduced = false;
  currentSpeaker = "";
  updateStats();
  statsGrid.classList.add("hidden");
  statTutorial.classList.add("hidden");
  showScreen(startScreen);
}

function showScreen(screen) {
  [startScreen, gameScreen, endingScreen].forEach((item) => {
    item.classList.add("hidden");
  });

  screen.classList.remove("hidden");
  screen.classList.remove("fade-in");
  void screen.offsetWidth;
  screen.classList.add("fade-in");
}

function loadChapter() {
  const chapter = chapters[currentChapterIndex];

  clearTimeout(typingTimer);
  typingTimer = null;
  isTyping = false;
  currentLineIndex = 0;
  hasChosen = false;
  currentSpeaker = "";

  document.getElementById("chapter-title").innerText = chapter.title;
  document.getElementById("chapter-number").innerText = currentChapterIndex + 1;
  document.getElementById("chapter-total").innerText = chapters.length;

  mainLayout.classList.remove("hidden");
  choicesEl.classList.add("hidden");
  choicesEl.innerHTML = "";
  resultPanel.classList.add("hidden");
  statTutorial.classList.add("hidden");
  dialoguePanel.classList.remove("hidden");
  dialogueNextBtn.classList.remove("hidden");
  statsGrid.classList.toggle("hidden", !statsIntroduced);
  restartChapterAnimation();
  showCurrentLine();
}

function showCurrentLine() {
  const chapter = chapters[currentChapterIndex];
  const line = chapter.lines[currentLineIndex];
  const isLastLine = currentLineIndex === chapter.lines.length - 1;

  document.getElementById("speaker").innerText = line.speaker;
  document.getElementById("speaker").classList.toggle("narration", line.speaker === "Hệ thống");
  document.getElementById("speaker-role").innerText = getRoleForSpeaker(line.speaker);
  if (line.speaker !== currentSpeaker) {
    currentSpeaker = line.speaker;
    updateAvatar(line.speaker);
  }
  currentFullText = line.text;
  dialogueNextBtn.innerText = isLastLine ? "Xem lựa chọn" : "Tiếp tục";
  typeCurrentText();
}

function nextLine(event) {
  if (event) {
    event.stopPropagation();
  }

  const chapter = chapters[currentChapterIndex];

  if (hasChosen) {
    return;
  }

  if (isTyping) {
    completeCurrentLine();
    return;
  }

  if (currentLineIndex < chapter.lines.length - 1) {
    currentLineIndex += 1;
    showCurrentLine();
    return;
  }

  if (currentChapterIndex === 0 && !statsIntroduced) {
    showStatTutorial();
    return;
  }

  showChoices();
}

function typeCurrentText() {
  const storyText = document.getElementById("story-text");
  let characterIndex = 0;

  clearTimeout(typingTimer);
  storyText.textContent = "";
  isTyping = true;

  function typeNextCharacter() {
    if (characterIndex < currentFullText.length) {
      characterIndex += 1;
      storyText.textContent = currentFullText.slice(0, characterIndex);
      typingTimer = setTimeout(typeNextCharacter, typingSpeed);
      return;
    }

    isTyping = false;
    typingTimer = null;
  }

  typeNextCharacter();
}

function completeCurrentLine() {
  clearTimeout(typingTimer);
  typingTimer = null;
  isTyping = false;
  document.getElementById("story-text").textContent = currentFullText;
}

function getAvatarForSpeaker(speaker) {
  return speakerAvatars[speaker] || speakerAvatars["Hệ thống"];
}

function getRoleForSpeaker(speaker) {
  return speakerRoles[speaker] || "Nhân vật";
}

function updateAvatar(speaker) {
  const avatarPath = getAvatarForSpeaker(speaker);
  const fallbackLetter = speaker.charAt(0).toUpperCase() || "?";

  avatarPlaceholder.textContent = fallbackLetter;
  avatarPlaceholder.classList.remove("hidden");
  avatarImg.classList.add("hidden");
  avatarImg.onload = () => {
    avatarPlaceholder.classList.add("hidden");
    avatarImg.classList.remove("hidden");
  };
  avatarImg.onerror = () => {
    avatarImg.classList.add("hidden");
    avatarPlaceholder.classList.remove("hidden");
  };
  avatarImg.src = avatarPath;
}

function showStatTutorial() {
  completeCurrentLine();
  dialogueNextBtn.classList.add("hidden");
  choicesEl.classList.add("hidden");
  resultPanel.classList.add("hidden");
  statsGrid.classList.remove("hidden");
  statTutorial.classList.remove("hidden");
  statTutorial.classList.remove("chapter-enter");
  void statTutorial.offsetWidth;
  statTutorial.classList.add("chapter-enter");
}

function finishStatTutorial() {
  statsIntroduced = true;
  statTutorial.classList.add("hidden");
  statsGrid.classList.remove("hidden");
  showChoices();
}

function showChoices() {
  const chapter = chapters[currentChapterIndex];

  completeCurrentLine();
  dialogueNextBtn.classList.add("hidden");
  choicesEl.classList.remove("hidden");
  choicesEl.innerHTML = "";

  chapter.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.innerHTML = `<strong>${choice.text}</strong><span>${choice.detail}</span>`;
    button.addEventListener("click", () => chooseOption(choice));
    choicesEl.appendChild(button);
  });

  choicesEl.classList.remove("chapter-enter");
  void choicesEl.offsetWidth;
  choicesEl.classList.add("chapter-enter");
}

function chooseOption(choice) {
  const chapter = chapters[currentChapterIndex];
  const beforeStats = { ...stats };

  hasChosen = true;
  applyEffects(choice.effects);
  updateStats();

  choicesEl.classList.add("hidden");
  showConsequence(choice, chapter, beforeStats);
}

function showConsequence(choice, chapter, beforeStats) {
  document.getElementById("consequence-text").innerText = choice.consequence;
  renderStatChanges(choice.effects, beforeStats);
  document.getElementById("choice-explanation-text").innerText = choice.detail;
  document.getElementById("choice-analysis-text").innerText = buildChoiceAnalysis(choice);
  document.getElementById("lesson-text").innerText = buildChoiceLesson(choice, chapter);
  nextChapterBtn.innerText =
    currentChapterIndex === chapters.length - 1
      ? "Xem kết thúc"
      : "Sang chương tiếp theo";

  resultPanel.classList.remove("hidden");
  dialoguePanel.classList.add("hidden");
  resultPanel.classList.remove("chapter-enter");
  void resultPanel.offsetWidth;
  resultPanel.classList.add("chapter-enter");
}

function buildChoiceAnalysis(choice) {
  const effects = choice.effects;
  const positives = [];
  const negatives = [];

  Object.keys(effects).forEach((key) => {
    const value = effects[key];
    const statName = statMeta[key].label;

    if (value > 0) {
      positives.push(`${statName} tăng ${value}`);
      return;
    }

    if (value < 0) {
      negatives.push(`${statName} giảm ${Math.abs(value)}`);
    }
  });

  const positiveText = positives.length
    ? `Mặt tích cực: ${positives.join(", ")}.`
    : "Mặt tích cực: lựa chọn này không tạo tăng trưởng rõ rệt cho chỉ số nào.";
  const negativeText = negatives.length
    ? `Mặt hạn chế: ${negatives.join(", ")}.`
    : "Mặt hạn chế: lựa chọn này ít tạo tổn thất trực tiếp lên các chỉ số.";

  return `${positiveText} ${negativeText} Điều này cho thấy chính sách luôn có đánh đổi: phát triển lực lượng sản xuất, ổn định xã hội và điều chỉnh quan hệ sản xuất phải được cân bằng với nhau.`;
}

function buildChoiceLesson(choice, chapter) {
  const effects = choice.effects;

  if ((effects.techPower || 0) > 15 && ((effects.trust || 0) < 0 || (effects.inequality || 0) > 0)) {
    return "Bài học: nếu chỉ thúc đẩy công nghệ và quyền lực nền tảng mà không điều chỉnh quan hệ sở hữu, phân phối và trách nhiệm xã hội, lực lượng sản xuất mới có thể làm mâu thuẫn giai cấp sâu sắc hơn. " + chapter.lesson;
  }

  if ((effects.economy || 0) < -10 && (effects.techPower || 0) <= 0) {
    return "Bài học: phủ nhận hoặc kìm hãm công nghệ quá mức có thể làm lực lượng sản xuất trì trệ. Vấn đề không phải loại bỏ AI, mà là đặt AI trong quan hệ sản xuất phù hợp với lợi ích xã hội. " + chapter.lesson;
  }

  if ((effects.trust || 0) > 0 || (effects.stability || 0) > 0 || (effects.inequality || 0) < 0) {
    return "Bài học: khi nhà nước dùng luật pháp, phúc lợi và điều tiết để phân phối lại lợi ích, quan hệ sản xuất được điều chỉnh để phù hợp hơn với lực lượng sản xuất mới. " + chapter.lesson;
  }

  return "Bài học: mỗi chính sách đều thể hiện một cách xử lý mâu thuẫn giữa lực lượng sản xuất mới và quan hệ sản xuất hiện hành. " + chapter.lesson;
}

function nextChapter() {
  if (currentChapterIndex < chapters.length - 1) {
    currentChapterIndex += 1;
    statsIntroduced = true;
    loadChapter();
    return;
  }

  showEnding();
}

function handleDialogueBoxClick() {
  const choicesAreVisible = !choicesEl.classList.contains("hidden");
  const consequenceIsVisible = !resultPanel.classList.contains("hidden");

  if (!choicesAreVisible && !consequenceIsVisible) {
    nextLine();
  }
}

function applyEffects(effects) {
  Object.keys(effects).forEach((key) => {
    stats[key] = clampStat(stats[key] + effects[key]);
  });
}

function clampStat(value) {
  return Math.max(0, Math.min(100, value));
}

function updateStats() {
  Object.keys(statMeta).forEach((key) => {
    document.getElementById(`${key}-value`).innerText = stats[key];
    document.getElementById(`${key}-bar`).style.width = `${stats[key]}%`;
  });
}

function renderStatChanges(effects, beforeStats) {
  changeList.innerHTML = "";

  Object.keys(effects).forEach((key) => {
    const change = stats[key] - beforeStats[key];
    const item = document.createElement("span");
    item.className = `change-pill ${change >= 0 ? "positive" : "negative"}`;
    item.innerText = `${statMeta[key].icon} ${statMeta[key].label} ${
      change > 0 ? "+" : ""
    }${change}`;
    changeList.appendChild(item);
  });
}

function restartChapterAnimation() {
  [dialoguePanel, document.getElementById("character-panel")].forEach((element) => {
    element.classList.remove("chapter-enter");
    void element.offsetWidth;
    element.classList.add("chapter-enter");
  });
}

function showEnding() {
  const ending = calculateEnding();

  document.getElementById("ending-title").innerText = ending.title;
  document.getElementById("ending-description").innerText = ending.story;
  document.getElementById("ending-specific-conclusion").innerText = ending.conclusion;
  document.getElementById("final-conclusion").innerText = finalConclusion;
  renderFinalStats();
  showScreen(endingScreen);
}

function calculateEnding() {
  if (stats.techPower >= 80) {
    return endings.tech;
  }

  if (stats.trust <= 30) {
    return endings.trust;
  }

  if (stats.inequality >= 75) {
    return endings.inequality;
  }

  if (stats.economy <= 25) {
    return endings.economy;
  }

  if (stats.stability <= 25) {
    return endings.stability;
  }

  return endings.good;
}

function renderFinalStats() {
  const finalStats = document.getElementById("final-stats");
  finalStats.innerHTML = "";

  Object.keys(statMeta).forEach((key) => {
    const card = document.createElement("div");
    card.className = "final-stat";
    card.innerHTML = `<span>${statMeta[key].icon} ${statMeta[key].label}</span><strong>${stats[key]}</strong><p>${statDescriptions[key]}</p>`;
    finalStats.appendChild(card);
  });
}
