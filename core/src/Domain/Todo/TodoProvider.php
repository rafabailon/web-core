<?php declare(strict_types=1);

namespace App\Domain\Todo;

use Doctrine\ORM\EntityManagerInterface;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\ResourceInterface;

class TodoProvider
{
    private EntityManagerInterface $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function all(): ResourceInterface
    {
        $result = $this->manager
            ->getConnection()
            ->createQueryBuilder()
            ->select('content, created_at, id')
            ->from('app.todo', 't')
            ->executeQuery()
        ;

        return new Collection(
            $result->fetchAllAssociative(),
            fn (array $todo) => [
                'content' => $todo['content'],
                'created_at' => $todo['created_at'],
                'id' => $todo['id'],
            ],
        );
    }
}
