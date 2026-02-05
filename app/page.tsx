import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -z-10 animate-float" />

        <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Derm Assistant AI v1.0
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] animate-slide-up">
            피부과 실무의 모든 것,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AI 어시스턴트
            </span>와 함께
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-100">
            복잡한 수가표 암기부터 시술 후 주의사항 안내까지.<br className="hidden sm:block" />
            신입 직원 교육을 위한 가장 스마트한 솔루션을 만나보세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-slide-up delay-200">
            <Link href="/fees" className="w-full sm:w-auto">
              <Button size="xl" className="w-full sm:w-auto shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow">
                📊 수가 조회 시작하기
              </Button>
            </Link>
            <Link href="/quiz" className="w-full sm:w-auto">
              <Button size="xl" variant="outline" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm">
                📝 실력 테스트하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid (Bento Style) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            실무에 필요한 모든 기능을<br />한곳에 모았습니다
          </h2>
          <p className="text-gray-600">
            현직 실장님들의 피드백을 반영한 실무 밀착형 기능
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="text-9xl">📊</div>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-900">똑똑한 수가 조회</h3>
              <p className="text-gray-600 max-w-md">
                "보톡스 얼마예요?" 당황하지 마세요.<br />
                시술명, 효과, 가격 정보를 검색 한 번으로 즉시 찾아드립니다.
                국산/수입 여부부터 용량별 가격까지 완벽하게 정리되어 있습니다.
              </p>
              <div className="pt-4">
                <Link href="/fees" className="text-blue-600 font-semibold hover:gap-2 transition-all inline-flex items-center gap-1">
                  조회하러 가기 <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Tall */}
          <div className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute -bottom-8 -right-8 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="text-9xl">📝</div>
            </div>
            <div className="relative z-10 space-y-4 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
                📝
              </div>
              <h3 className="text-2xl font-bold text-gray-900">맞춤형 학습 퀴즈</h3>
              <p className="text-gray-600 flex-grow">
                오늘 배운 내용을 퀴즈로 복습해보세요.
                틀린 문제는 상세한 해설과 함께 다시 공부할 수 있습니다.
              </p>
              <div className="mt-auto pt-4 p-4 bg-purple-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-purple-900">나의 학습 현황</span>
                  <span className="text-xs text-purple-700">Level 1</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-[0%] group-hover:w-[60%] transition-all duration-1000"></div>
                </div>
              </div>
              <Link href="/quiz" className="text-purple-600 font-semibold hover:gap-2 transition-all inline-flex items-center gap-1 mt-4">
                퀴즈 풀러 가기 <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Normal */}
          <div className="relative group overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                🧮
              </div>
              <h3 className="text-xl font-bold text-gray-900">비용 계산기</h3>
              <p className="text-gray-600">
                복잡한 패키지 할인 계산, 이제 실수 없이 정확하게 계산하세요.
              </p>
              <Link href="/calculator" className="text-green-600 font-semibold hover:gap-2 transition-all inline-flex items-center gap-1 mt-2">
                계산하기 <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 4: Normal */}
          <div className="relative group overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                📚
              </div>
              <h3 className="text-xl font-bold text-gray-900">시술 가이드</h3>
              <p className="text-gray-600">
                시술 후 주의사항, 부작용 대처법 등 필수 정보를 확인하세요.
              </p>
              <Link href="/guide" className="text-orange-600 font-semibold hover:gap-2 transition-all inline-flex items-center gap-1 mt-2">
                확인하기 <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">등록된 시술</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gray-900">25+</div>
              <div className="text-gray-600">학습 퀴즈</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600">무료 사용</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">언제 어디서나</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 text-center pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-12 text-white relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold">지금 바로 시작해보세요</h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Derm Assistant AI와 함께라면<br />
              더 이상 어려운 시술 용어와 복잡한 계산 때문에 고민할 필요가 없습니다.
            </p>
            <div className="pt-4">
              <Link href="/fees">
                <Button variant="secondary" size="large" className="bg-white text-gray-900 hover:bg-gray-100 border-none shadow-xl">
                  무료로 시작하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
