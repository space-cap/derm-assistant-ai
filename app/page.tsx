import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { CATEGORIES } from '@/lib/constants';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold text-gray-900">
          🏥 Derm Assistant AI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          신입 피부과 직원을 위한 지능형 온보딩 플랫폼
          <br />
          복잡한 진료 수가와 시술 정보를 쉽게 학습하세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/fees">
            <Button size="large" variant="primary">
              📊 수가 조회 시작하기
            </Button>
          </Link>
          <Link href="/quiz">
            <Button size="large" variant="outline">
              📝 학습 퀴즈 풀기
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          주요 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card hover>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">
                📊 수가 조회
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                보톡스, 필러, 리프팅, 스킨부스터 등 다양한 시술의 수가를 한눈에 확인하세요.
                국산/수입 제품별 가격 비교도 가능합니다.
              </p>
            </CardBody>
          </Card>

          <Card hover>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">
                🧮 비용 계산기
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                여러 시술을 조합하여 총 비용을 계산하고, 패키지 할인을 자동으로 적용받으세요.
              </p>
            </CardBody>
          </Card>

          <Card hover>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">
                📚 시술 가이드
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                각 시술의 특징, 효과, 주의사항, 사후 관리 방법을 상세하게 안내합니다.
              </p>
            </CardBody>
          </Card>

          <Card hover>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">
                📝 학습 퀴즈
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                25개의 퀴즈 문제로 시술 지식을 테스트하고, 상세한 해설로 학습하세요.
              </p>
            </CardBody>
          </Card>

          <Card hover>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">
                ⭐ 즐겨찾기
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                자주 찾는 시술을 즐겨찾기에 추가하여 빠르게 접근하세요.
              </p>
            </CardBody>
          </Card>

          <Card hover>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">
                🎁 패키지 할인
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                동일 시술 3회 이상 선택 시 자동으로 패키지 할인이 적용됩니다.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          시술 카테고리
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/fees?category=${category.id}`}>
              <Card hover className="h-full">
                <CardBody className="text-center space-y-2">
                  <div className="text-4xl">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-center text-white space-y-6">
        <h2 className="text-3xl font-bold">
          지금 바로 시작하세요!
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Derm Assistant AI와 함께 피부과 전문가로 성장하세요.
          복잡한 수가 정보를 쉽고 빠르게 학습할 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/fees">
            <Button size="large" variant="secondary">
              📊 수가 조회하기
            </Button>
          </Link>
          <Link href="/guide">
            <Button size="large" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
              📚 가이드 보기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
